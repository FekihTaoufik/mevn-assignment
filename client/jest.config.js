module.exports = {
  preset: "@vue/cli-plugin-unit-jest",
  setupFilesAfterEnv: ["./tests/setup.js"],
  collectCoverage: true,
  collectCoverageFrom: [
    "src/{utils,components,views}/**/*.{js,vue}",
    "!src/**/index.js",
  ],
};
