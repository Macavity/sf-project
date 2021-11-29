module.exports = {
    root: true,
    extends: [
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    env: {
        browser: true,
        jquery: true,
        node: true,
        jest: true,
    },
    globals: {
        NODE_ENV: true,
        settings: true,
    },
    rules: {
        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": "warn",
        "react/react-in-jsx-scope": "off",
        "react/prop-types": "off",
        "@typescript-eslint/no-empty-interface": "off",
    },
    parserOptions: {
        parser: '@typescript-eslint/parser',
    },
    plugins: [
        "@typescript-eslint",
        "react-hooks"
    ],
};
