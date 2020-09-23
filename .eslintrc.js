module.exports = {
  extends: ["eslint:recommended", "plugin:react/recommended"],
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  parser: "babel-eslint",
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ["react", "react-hooks", "unused-imports", "simple-import-sort"],
  settings: {
    react: {
      version: "detect",
    },
  },
  ignorePatterns: ["scripts/**"],
  rules: {
    // required for "plugins": ["unused-imports"]
    "react/prop-types": "off",
    "react/jsx-uses-react": "warn",
    "react/jsx-uses-vars": "warn",
    "no-unused-vars": "off",
    "unused-imports/no-unused-imports": "error",
    "unused-imports/no-unused-vars": [
      "warn",
      {
        vars: "all",
        varsIgnorePattern: "^_",
        args: "after-used",
        argsIgnorePattern: "^_",
      },
    ],
    "no-multi-spaces": "error",
    "no-multiple-empty-lines": ["error", { max: 1, maxEOF: 1 }],

    // required for simple-import-sort
    "simple-import-sort/sort": "error",
    "sort-imports": "off",
    "import/order": "off",

    // misc
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
        selector:
          "CallExpression[callee.name='setTimeout'][arguments.length!=2]",
        message: "setTimeout must always be invoked with two arguments.",
      },
      {
        selector:
          "CallExpression[callee.name='setInterval'][arguments.length!=2]",
        message: "setInterval must always be invoked with two arguments.",
      },
    ],
  },
}
