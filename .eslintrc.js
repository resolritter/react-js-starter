module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
  ],
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ["react", "react-hooks"],
  settings: {
    react: {
      version: "detect",
    },
  },
  ignorePatterns: ["scripts/**"],
  rules: {
    "require-atomic-updates": "off",
    "react/prefer-stateless-function": [
      0,
      {
        ignorePureComponents: false,
      },
    ],
    "use-isnan": "error",
    "no-restricted-syntax": [
      "error",
      {
        selector: "CallExpression[callee.name='setTimeout'][arguments.length!=2]",
        message: "setTimeout must always be invoked with two arguments.",
      },
      {
        selector: "CallExpression[callee.name='setInterval'][arguments.length!=2]",
        message: "setInterval must always be invoked with two arguments.",
      },
    ],
  },
}
