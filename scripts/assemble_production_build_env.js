const path = require("path")
const fs = require("fs")
const crypto = require("crypto")

const operation = process.argv[2]
const prodEnvFile = path.join(__dirname, "../env/webpackProdBuild.js")

if (fs.existsSync(prodEnvFile)) {
  if (!operation) {
    console.log(`Using pre-existing environment at ${prodEnvFile}`)
  }
} else {
  fs.writeFileSync(
    prodEnvFile,
    `process.env.CHUNKS_HASH_SALT ??= "${crypto
      .randomBytes(32)
      .toString("base64")}"
process.env.NODE_ENV ??= "production"`,
  )

  if (!operation) {
    console.log(`Production environment assembled to ${prodEnvFile}`)
  }
}

if (!operation) {
  process.exit(0)
}

switch (operation) {
  case "analyze": {
    const productionEnvAnalyzeFile = path.join(
      __dirname,
      "../env/webpackProdBuildAnalyze.js",
    )
    if (fs.existsSync(productionEnvAnalyzeFile)) {
      console.log(
        `Using pre-existing environment at ${productionEnvAnalyzeFile}`,
      )
    } else {
      const prodEnv = fs.readFileSync(prodEnvFile).toString()
      fs.writeFileSync(
        productionEnvAnalyzeFile,
        `${prodEnv}\nprocess.env.ANALYZE_BUNDLE ??= 1`,
      )
      console.log(
        `Production analyze environment assembled to ${productionEnvAnalyzeFile}`,
      )
    }
    break
  }
  default:
    console.error(`Unknown operation ${operation}`)
    process.exit(1)
    break
}
