export default {
  preset: "ts-jest",
  roots: ["<rootDir>"],
  testEnvironment: "node",
  testMatch: [
    "**/__tests__/**/*.[jt]s?(x)",
    "**/?(*.)+(spec|test).[tj]s?(x)",
  ],
  transform: {"^.+\\.ts$": "ts-jest"},
};
