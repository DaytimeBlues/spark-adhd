module.exports = {
  preset: "react-native",
  testEnvironment: "node",
  testMatch: ["**/__tests__/**/*.(test|spec).{ts,tsx,js,jsx}"],
  testPathIgnorePatterns: [
    "/node_modules/",
    "/detox/",
    "android\\.e2e\\.test\\.ts$",
  ],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
  collectCoverageFrom: ["src/**/*.{ts,tsx}", "!src/**/*.d.ts"],
  coverageThreshold: {
    global: {
      branches: 60,
      functions: 60,
      lines: 60,
      statements: 60,
    },
  },
  setupFilesAfterEnv: ["<rootDir>/__tests__/setup.ts"],
};
