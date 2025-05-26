// eslint.config.js
import globals from 'globals';
import tseslint from 'typescript-eslint';
import eslintJs from '@eslint/js';
import prettierRecommended from 'eslint-plugin-prettier/recommended'; // Handles Prettier rules and conflicts

export default tseslint.config(
  {
    // Global ignores
    // Files and directories to ignore globally.
    // This replaces the old .eslintignore file and the ignorePatterns array in .eslintrc.js
    ignores: [
      'node_modules/',
      'dist/',
      'coverage/',
      '*.log',
      '.DS_Store',
      '.prettierrc.js', // Often good to ignore config files themselves
      'eslint.config.js', // Ignore this config file itself
    ],
  },
  // Base ESLint recommended rules
  eslintJs.configs.recommended,

  // TypeScript specific configurations
  // This replaces plugin:@typescript-eslint/recommended
  ...tseslint.configs.recommendedTypeChecked, // Or tseslint.configs.recommended for non-type-checked rules

  {
    // Configuration for TypeScript files
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: './tsconfig.json', // Path to your tsconfig.json
        tsconfigRootDir: import.meta.dirname, // Or process.cwd() if not using ES modules for config
      },
      globals: {
        ...globals.node, // Node.js global variables
        ...globals.es2020, // ECMAScript 2020 globals
      },
    },
    rules: {
      // Your specific rules or overrides for TypeScript files
      'no-console': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_' },
      ],
      // Add any other rules you want
    },
  },

  // Prettier integration
  // This should be the last configuration to override any formatting rules
  // from other configs if necessary. eslint-plugin-prettier/recommended
  // already includes eslint-config-prettier.
  prettierRecommended
);
