// @ts-check
const eslint = require("@eslint/js");
const { defineConfig } = require("eslint/config");
const tseslint = require("typescript-eslint");
const angular = require("angular-eslint");

const packageTsFiles = [
  "projects/ngx-translate-router/src/**/*.ts",
  "projects/ngx-translate-router-http-loader/src/**/*.ts",
];

const packageHtmlFiles = [
  "projects/ngx-translate-router/src/**/*.html",
  "projects/ngx-translate-router-http-loader/src/**/*.html",
];

module.exports = defineConfig([
  {
    ignores: [
      "coverage/**",
      "dist/**",
      "e2e/**",
      "node_modules/**",
      "src/**",
    ],
  },
  {
    files: packageTsFiles,
    extends: [
      eslint.configs.recommended,
      tseslint.configs.recommended,
      tseslint.configs.stylistic,
      angular.configs.tsRecommended,
    ],
    processor: angular.processInlineTemplates,
    languageOptions: {
      parserOptions: {
        jsDocParsingMode: "all",
        projectService: true,
        tsconfigRootDir: __dirname,
      },
    },
    rules: {
      "@angular-eslint/component-class-suffix": "error",
      "@angular-eslint/component-selector": [
        "error",
        {
          type: "element",
          prefix: "lib",
          style: "kebab-case",
        },
      ],
      "@angular-eslint/contextual-lifecycle": "error",
      "@angular-eslint/directive-class-suffix": "error",
      "@angular-eslint/directive-selector": [
        "error",
        {
          type: "attribute",
          prefix: "lib",
          style: "camelCase",
        },
      ],
      "@angular-eslint/no-conflicting-lifecycle": "error",
      "@angular-eslint/no-input-rename": "error",
      "@angular-eslint/no-inputs-metadata-property": "error",
      "@angular-eslint/no-output-native": "error",
      "@angular-eslint/no-output-on-prefix": "error",
      "@angular-eslint/no-output-rename": "error",
      "@angular-eslint/no-outputs-metadata-property": "error",
      "@angular-eslint/no-empty-lifecycle-method": "off",
      "@angular-eslint/prefer-inject": "off",
      "@angular-eslint/prefer-standalone": "off",
      "@angular-eslint/use-lifecycle-interface": "error",
      "@angular-eslint/use-pipe-transform-interface": "error",
      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/array-type": "off",
      "@typescript-eslint/consistent-type-definitions": "off",
      "@typescript-eslint/explicit-member-accessibility": "off",
      "@typescript-eslint/member-ordering": [
        "error",
        {
          default: {
            memberTypes: [
              "static-field",
              "instance-field",
              "static-method",
              "instance-method",
            ],
          },
        },
      ],
      "@typescript-eslint/no-deprecated": "warn",
      "@typescript-eslint/no-empty-function": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-inferrable-types": [
        "error",
        {
          ignoreParameters: true,
        },
      ],
      "@typescript-eslint/no-non-null-assertion": "error",
      "@typescript-eslint/no-require-imports": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-use-before-define": [
        "error",
        {
          classes: false,
          functions: false,
          typedefs: false,
          variables: true,
        },
      ],
      "@typescript-eslint/no-var-requires": "off",
      "arrow-parens": "off",
      "comma-dangle": "off",
      "max-classes-per-file": "off",
      "max-len": [
        "error",
        {
          code: 140,
        },
      ],
      "no-console": [
        "error",
        {
          allow: ["error", "log", "warn"],
        },
      ],
      "no-empty": "off",
      "no-fallthrough": "error",
      "no-multiple-empty-lines": "off",
      "no-prototype-builtins": "off",
      "no-restricted-imports": [
        "error",
        {
          paths: ["rxjs/Rx"],
        },
      ],
      "no-useless-assignment": "off",
      "no-use-before-define": "off",
      "quote-props": ["error", "as-needed"],
      quotes: [
        "error",
        "single",
        {
          avoidEscape: true,
        },
      ],
      "sort-imports": "off",
    },
  },
  {
    files: packageHtmlFiles,
    extends: [angular.configs.templateRecommended],
    rules: {
      "@angular-eslint/template/banana-in-box": "error",
      "@angular-eslint/template/eqeqeq": "off",
      "@angular-eslint/template/no-negated-async": "error",
      "@angular-eslint/template/prefer-control-flow": "off",
    },
  },
]);
