const cp = require("child_process")
const path = require("path")
const assert = require("assert")
const asyncPool = require("tiny-async-pool")
const os = require("os")

const command = process.argv[2]
assert.ok(command)
const args = process.argv.slice(3)

const eslintExtensions = ["js", "jsx"]
const prettierExtensions = ["json", "html"]
const root = path.join(__dirname, "..")
const eslintPath = path.join(root, "./node_modules/.bin/eslint")
const prettierPath = path.join(root, "./node_modules/.bin/prettier")
const runSubProcConfiguration = { cwd: root, stdio: "inherit" }

console.log(`[DEBUG] ${JSON.stringify({ command, args })}`)

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
      runSubProcConfiguration,
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
        runSubProcConfiguration,
      )
      break
    }
    default:
      console.error(`[ERROR] Unknown command ${command}`)
      process.exit(1)
  }
  process.exit(0)
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
    .filter(function (file) {
      return file[0] == "A" || file[0] == "M"
    })

  if (stagedFilesOutput.length) {
    console.log("[INFO] operating on staged files")

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
            return line.slice(i)
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
  const lint = function (extraArgs = []) {
    return asyncPool(virtualCoresCount, eslintFiles, function (file) {
      return new Promise(function (resolve) {
        console.log(`[BEGIN WORK] ${file}`)
        cp.execFile(
          "node",
          [eslintPath, ...extraArgs, file],
          runSubProcConfiguration,
          resolve,
        )
      })
    })
  }

  switch (command) {
    case "lint": {
      await lint()
      break
    }
    case "fix": {
      await lint(["--fix"])
      await asyncPool(virtualCoresCount, prettierFiles, function (file) {
        return new Promise(function (resolve) {
          console.log(`[BEGIN WORK] ${file}`)
          cp.execFile(
            "node",
            [prettierPath, "--write", file],
            runSubProcConfiguration,
            resolve,
          )
        })
      })
      break
    }
    default:
      break
  }
})()
