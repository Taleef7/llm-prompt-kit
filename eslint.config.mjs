// eslint.config.mjs
import globals from 'globals';
import tseslint from 'typescript-eslint'; // Main typescript-eslint object
import eslintJs from '@eslint/js';
import prettierRecommended from 'eslint-plugin-prettier/recommended';
import eslintPluginVitest from 'eslint-plugin-vitest';

export default [ // Exporting an array directly
  // 1. Global Ignores
  {
    ignores: [
      'node_modules/',
      'dist/',
      'coverage/',
      '*.log',
      '.DS_Store',
      '.prettierrc.js',
      'eslint.config.mjs', // Ignoring itself
      'vitest.config.ts',  // Ignoring Vitest config
    ],
  },

  // 2. ESLint Recommended (for JS files, also provides a base)
  eslintJs.configs.recommended,

  // 3. Base TypeScript Configuration for ALL .ts files in src/
  // This includes recommendedTypeChecked rules and sets up the parser with project info.
  // `tseslint.configs.recommendedTypeChecked` is an array of config objects, so we spread it.
  ...tseslint.configs.recommendedTypeChecked.map(config => ({
    ...config, // Spread the original config from recommendedTypeChecked
    files: ['src/**/*.ts'], // Apply this entire block (including type-aware rules) to all .ts files in src
    languageOptions: {
      ...(config.languageOptions || {}), // Preserve existing languageOptions if any
      parserOptions: {
        ...(config.languageOptions?.parserOptions || {}), // Preserve existing parserOptions if any
        project: ['./tsconfig.json'], // Ensure project is set, can be an array
        tsconfigRootDir: import.meta.dirname, // Or process.cwd() if import.meta.dirname causes issues
      },
    },
  })),

  // 4. Specific configurations for non-test TypeScript source files in src/
  {
    files: ['src/**/*.ts'],
    ignores: ['src/**/*.test.ts'], // Exclude test files from this specific block of rules/globals
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.es2020,
      },
    },
    rules: {
      'no-console': 'warn',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      // Add other rules specific to your main source code if needed
    },
  },

  // 5. Specific configurations for Vitest test files in src/
  // These files already have the type-checking from block #3 applied to them because they match 'src/**/*.ts'.
  // This block adds Vitest specific plugins, globals, and rule overrides.
  {
    files: ['src/**/*.test.ts'], // Can also include 'tests/**/*.test.ts' if you have a top-level tests dir
    plugins: {
      vitest: eslintPluginVitest,
    },
    languageOptions: {
      globals: {
        ...globals.vitest, // Add Vitest globals
      },
      // parserOptions.project is effectively inherited from block #3 for these files
    },
    rules: {
      ...(eslintPluginVitest.configs?.recommended?.rules || {}), // Vitest specific rules
      'no-console': 'off', // Allow console.log in tests
      // You might want to relax certain type-aware rules for tests if necessary:
      // '@typescript-eslint/no-explicit-any': 'off',
      // '@typescript-eslint/no-unsafe-assignment': 'off',
      // '@typescript-eslint/no-non-null-assertion': 'off',
    },
  },

  // 6. Prettier configuration (should always be last)
  prettierRecommended,
];