// eslint.config.mjs
import globals from "globals"; // Make sure this import is at the top
import tseslint from "typescript-eslint";
import eslintJs from "@eslint/js";
import prettierRecommended from "eslint-plugin-prettier/recommended";
import eslintPluginVitest from "eslint-plugin-vitest";

export default tseslint.config(
  {
    // Global ignores
    ignores: [
      "node_modules/",
      "dist/",
      "coverage/",
      "*.log",
      ".DS_Store",
      ".prettierrc.js",
      "eslint.config.mjs",
      "vitest.config.ts",
    ],
  },
  eslintJs.configs.recommended, // Base ESLint recommended
  ...tseslint.configs.recommendedTypeChecked, // Base TypeScript recommended (type-checked)

  {
    // Main configuration for your source files (excluding tests)
    files: ["src/**/*.ts"],
    ignores: ["src/**/*.test.ts"], // Ensure test files are excluded from this block
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: import.meta.dirname,
      },
      globals: {
        ...globals.node,
        ...globals.es2020,
      },
    },
    rules: {
      "no-console": "warn",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_" },
      ],
      // any other rules for your main src code
    },
  },

  // Configuration specifically for Vitest test files
  {
    files: ["src/**/*.test.ts", "tests/**/*.test.ts"], // Target your test files
    plugins: {
      vitest: eslintPluginVitest,
    },
    rules: {
      // Try to apply recommended Vitest rules.
      // If this part also causes errors (e.g., if eslintPluginVitest.configs is undefined),
      // we may need to temporarily comment it out.
      ...(eslintPluginVitest.configs?.recommended?.rules || {}), // Safely access rules
      // Example: Allow non-null assertions in tests if you use them
      // '@typescript-eslint/no-non-null-assertion': 'off',
    },
    languageOptions: {
      globals: {
        // Use 'globals.vitest' directly from the 'globals' package
        ...globals.vitest,
      },
    },
  },
  prettierRecommended, // Prettier should be last
);
