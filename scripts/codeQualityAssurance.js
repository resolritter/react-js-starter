const cp = require("child_process")
const path = require("path")
const assert = require("assert")
const asyncPool = require("tiny-async-pool")
const os = require("os")

const command = process.argv[2]
assert.ok(command)
let args = process.argv.slice(3)
let isQuiet
if (args[0] === "--quiet") {
  isQuiet = true
  args = args.slice(1)
}

const errorExitCode = 1
const eslintExtensions = ["js", "jsx"]
const prettierExtensions = ["json", "html"]
const root = path.join(__dirname, "..")
const eslintPath = path.join(root, "./node_modules/.bin/eslint")
const prettierPath = path.join(root, "./node_modules/.bin/prettier")
const processCheckConfig = {
  cwd: root,
  stdio: "inherit",
}

const log = function (message, channel = "log") {
  if (isQuiet) {
    return
  }
  console[channel](message)
}

log(`[DEBUG] ${JSON.stringify({ command, args })}`)

if (command.endsWith("all")) {
  const lintAll = function (extraArgs = []) {
    cp.execFileSync(
      "node",
      [
        eslintPath,
        ...extraArgs,
        ...eslintExtensions.map(function (ext) {
          return `--ext=${ext}`
        }),
        ".",
      ],
      processCheckConfig,
    )
  }

  switch (command) {
    case "lint_all": {
      lintAll()
      break
    }
    case "fix_all": {
      lintAll(["--fix"])
      cp.execFileSync(
        "node",
        [prettierPath, "--write", `**/*.{${prettierExtensions.join(",")}}`],
        processCheckConfig,
      )
      break
    }
    default:
      console.error(`[ERROR] Unknown command ${command}`)
      process.exit(1)
  }
  process.exit(0)
}

const parseGitStatusLine = function (line, delimiter = '"') {
  if (line[0] !== delimiter) {
    const indexOfRenameSign = line.indexOf(" -> ")
    return indexOfRenameSign > -1
      ? {
          path: line.slice(0, indexOfRenameSign),
          read: indexOfRenameSign,
        }
      : {
          path: line,
          read: line.length,
        }
  }

  let skipEscaped = false
  let i = 1
  for (; i < line.length; ++i) {
    if (line[i] === "\\") {
      skipEscaped = true
      line = `${line.slice(0, i)}${line.slice(i + 1)}`
      --i
    } else if (line[i] === delimiter) {
      if (skipEscaped) {
        skipEscaped = false
      } else {
        break
      }
    }
  }

  return { path: line.slice(1, i), read: i + 1 }
}

let files
if (args.length) {
  console.log("[INFO] operating on argument files")
  files = args
} else {
  const stagedFilesOutput = cp
    .execFileSync("git", ["status", "--short"], { cwd: root })
    .toString()
    .trim()
    .split("\n")
    .filter(function (line) {
      return line[0] === "A" || line[0] === "M" || line.slice(0, 2) === "R "
    })

  if (stagedFilesOutput.length) {
    log("[INFO] operating on staged files")

    files = stagedFilesOutput.map(function (line) {
      let whitespaceCount = 0
      let isWhitespacing = false
      for (let i = 0; i < line.length; ++i) {
        if (line[i] === " ") {
          if (!isWhitespacing) {
            isWhitespacing = true
            whitespaceCount += 1
          }
        } else if (isWhitespacing) {
          isWhitespacing = false
          if (whitespaceCount === 1) {
            let remainder = line.slice(i)
            const { path: origin, read } = parseGitStatusLine(remainder)
            if (line[0] === "R") {
              /*
              When a file is renamed, the line output is like "previous -> next".
              Therefore, the string should be split at the " -> " position and
              the "next" location will be used for the linters.
              However, the file name itself might have the " -> " sequence,
              in which case the file names' output will be quoted. The quotes
              will serve to disambiguate where the previous and new paths
              begin and end.

              Case 1: renaming a file "a -> b" to "a -> c" will yield the
              following:
                 R  "a -> b" -> "a -> c"
              The middle arrow will not be quoted, thus it's possible to
              know where each path begins and ends.

              Case 2: renaming a file "a->b" to "a->c" will yield the
              following:
                 R  a->b -> a->c
              There can't be occurrences of " -> " inside of the previous path,
              otherwise it'd be quoted.
              */

              remainder = remainder.slice(read + " -> ".length)
              const { path: destination } = parseGitStatusLine(remainder)
              return destination
            } else {
              return origin
            }
          }
        }
      }
    })
  }
}

if (!files?.length) {
  console.error(
    "No files are staged on Git and no file arguments were given. Exiting.",
  )
  process.exit(1)
}

const eslintFiles = files.filter(function (file) {
  for (const ext of eslintExtensions) {
    return file.endsWith(`.${ext}`)
  }
})
const prettierFiles = files.filter(function (file) {
  for (const ext of prettierExtensions) {
    return file.endsWith(`.${ext}`)
  }
})

const virtualCoresCount = os.cpus().length
;(async function () {
  const runLinter = async function (extraArgs = []) {
    let hasAnyFailed = false

    await asyncPool(virtualCoresCount, eslintFiles, function (file) {
      return new Promise(function (resolve) {
        console.log(`[INFO] linting ${file}`)
        cp.execFile(
          "node",
          [eslintPath, ...extraArgs, file],
          processCheckConfig,
          resolve,
          function (error, _, stderr) {
            error ??= stderr
            if (error) {
              console.error(error)
              hasAnyFailed = true
            }
          },
        )
      })
    })

    return hasAnyFailed
  }

  const runFormatter = async function (mode) {
    let hasAnyFailed = false

    await asyncPool(virtualCoresCount, prettierFiles, function (file) {
      return new Promise(function (resolve) {
        console.log(`[INFO] formatting ${file}`)
        cp.execFile(
          "node",
          [prettierPath, mode, file],
          processCheckConfig,
          resolve,
          function (error, _, stderr) {
            error ??= stderr
            if (error) {
              console.error(error)
              hasAnyFailed = true
            }
          },
        )
      })
    })

    return hasAnyFailed
  }

  switch (command) {
    case "lint": {
      const hasLintFailed = await runLinter()
      if (hasLintFailed) {
        process.exit(errorExitCode)
      }
      break
    }
    case "fix": {
      const hasFixFailed = await runLinter(["--fix"])
      if (hasFixFailed) {
        process.exit(errorExitCode)
      } else {
        const hasFormatFailed = await runFormatter("--write")
        if (hasFormatFailed) {
          process.exit(errorExitCode)
        }
      }
      break
    }
    default:
      break
  }
})()
