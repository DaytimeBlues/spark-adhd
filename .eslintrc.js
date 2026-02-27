module.exports = {
  root: true,
  env: {
    node: true,
    "react-native/react-native": true,
  },
  extends: ["@react-native"],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  rules: {
    "no-unused-vars": "off",
    "no-console": "warn",
    "react-hooks/exhaustive-deps": "warn",
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/no-explicit-any": "warn",
  },
};
