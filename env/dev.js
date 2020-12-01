const path = require("path")

require("dotenv").config({
  path: require("path").join(__dirname, "../.env"),
})

process.env.NODE_ENV ??= "development"
