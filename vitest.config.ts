// vitest.config.ts
import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths'; // Optional: if you use tsconfig paths

export default defineConfig({
  plugins: [
    tsconfigPaths(), // Optional: if you use tsconfig paths for aliases like @/*
  ],
  test: {
    globals: true, // Makes describe, it, expect, etc., globally available without imports
    environment: 'node', // Or 'jsdom' if you were testing browser-specific code
    coverage: {
      provider: 'v8', // or 'istanbul'
      reporter: ['text', 'json', 'html', 'lcov'], // Output formats for coverage reports
      reportsDirectory: './coverage', // Where coverage reports will be stored
      include: ['src/**/*.ts'], // Files to include in coverage analysis
      exclude: [ // Files/patterns to exclude
        'src/index.ts', // Often, the main export file doesn't have much logic to test directly
        'src/**/*.test.ts', // Exclude test files themselves
        'src/**/types.ts', // If you have dedicated type definition files
        // Add other patterns if needed
      ],
      all: true, // Report coverage for all files in `include`, even if no tests exist for them
    },
  },
});