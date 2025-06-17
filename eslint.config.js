import js from "@eslint/js";
import globals from "globals";
import json from "@eslint/json";
import css from "@eslint/css";
import { defineConfig } from "eslint/config";
import { globalIgnores } from "eslint/config";

export default defineConfig([
  globalIgnores([
    "bower_components/",
    "node_modules/",
    ".devcontainer/",
    "package-lock.json",
    "package.json",
    "vite.config.mjs",
    "eslint.config.js",
  ]),
  { files: ["**/*.{js,mjs,cjs}"], plugins: { js }, extends: ["js/recommended"] },
  { files: ["**/*.{js,mjs,cjs}"], languageOptions: { globals: globals.browser } },
  { files: ["**/*.json"], plugins: { json }, language: "json/json", extends: ["json/recommended"] },
  { files: ["**/*.css"], plugins: { css }, language: "css/css", extends: ["css/recommended"] },
]);
