import { FlatCompat } from "@eslint/eslintrc";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "plugin:prettier/recommended"),

  {
    files: ["**/*.js", "**/*.ts", "**/*.tsx"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
    },
    rules: {
      quotes: "off",
      semi: "off",
      "prettier/prettier": [
        "warn",
        {
          singleQuote: false,
          semi: true,
          tabWidth: 2,
          useTabs: false,
          trailingComma: "es5",
          bracketSpacing: true,
          arrowParens: "avoid",
          endOfLine: "lf",
        },
      ],
    },
  },

  {
    files: ["**/app/api/**", "**/lib/**", "**/server/**"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: {
        NodeJS: true,
      },
    },
    rules: {},
  },
];

// ✅ Exportación nombrada para evitar el error del plugin import
export default eslintConfig;
