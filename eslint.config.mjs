import globals from "globals";
import { defineConfig, globalIgnores } from "eslint/config";
import eslint from "@eslint/js";
import react from "eslint-plugin-react";
import reactRecommended from "eslint-plugin-react/configs/recommended.js";
import nextVitals from "eslint-config-next/core-web-vitals";

const eslintConfig = defineConfig([
  eslint.configs.recommended,
  reactRecommended,
  {
    plugins: {
      react,
    },
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
  },
  ...nextVitals,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;