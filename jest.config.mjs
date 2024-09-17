export default {
  preset: "ts-jest",
  roots: ["<rootDir>"],
  testEnvironment: "node",
  testMatch: ["**/tests/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[tj]s?(x)"],
  transform: { "^.+\\.ts$": "ts-jest" },
};
