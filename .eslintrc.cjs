module.exports = {
  env: { browser: true, es2024: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended-type-checked",
    "plugin:@typescript-eslint/stylistic-type-checked",
    "plugin:compat/recommended",
    "plugin:react-hooks/recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "prettier",
    "plugin:perfectionist/recommended-natural",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    EXPERIMENTAL_useProjectService: true,
  },
  plugins: ["compat", "react-refresh", "react", "react-hooks", "perfectionist"],
  root: true,
  rules: {
    "no-duplicate-imports": "warn",
    "require-atomic-updates": "warn",
    camelcase: "warn",
    curly: "warn",
    "dot-notation": "warn",
    eqeqeq: "warn",
    "logical-assignment-operators": ["warn", "always", { enforceForIfStatements: true }],
    "no-array-constructor": "warn",
    "no-else-return": "warn",
    "no-lonely-if": "warn",
    "no-shadow": "warn",
    "no-unneeded-ternary": "warn",
    "no-useless-return": "warn",
    "no-var": "warn",
    "object-shorthand": "warn",
    "operator-assignment": "warn",
    "prefer-arrow-callback": ["warn", { allowNamedFunctions: true }],
    "prefer-const": "warn",
    "prefer-destructuring": "warn",
    "prefer-exponentiation-operator": "warn",
    "prefer-named-capture-group": "warn",
    "prefer-promise-reject-errors": "warn",
    "prefer-regex-literals": "warn",
    "prefer-template": "warn",
    radix: "warn",
    "require-unicode-regexp": "warn",
    yoda: "warn",

    "react/destructuring-assignment": ["warn", "always"],
    "react/hook-use-state": "warn",
    "react/jsx-boolean-value": "warn",
    "react/jsx-child-element-spacing": "warn",
    "react/jsx-curly-brace-presence": ["warn", "never"],
    "react/jsx-no-leaked-render": "warn",
    "react/jsx-pascal-case": "warn",
    "react/no-access-state-in-setstate": "warn",
    "react/no-array-index-key": "warn",
    "react/no-unstable-nested-components": "warn",
    "react/prefer-es6-class": "warn",
    "react/prefer-stateless-function": "warn",
    "react/self-closing-comp": "warn",
    "react/void-dom-elements-no-children": "warn",

    "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
  },
};
