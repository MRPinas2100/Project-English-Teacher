// ESLint v9 Flat config
import js from "@eslint/js"
import vue from "eslint-plugin-vue"
import prettier from "eslint-config-prettier"

export default [
  {
    ignores: ["dist", "node_modules", ".vite", "coverage"],
  },

  js.configs.recommended,

  ...vue.configs["flat/recommended"],

  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },
    rules: {
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      "no-console": ["warn", { allow: ["warn", "error"] }],
    },
  },

  prettier,
]
