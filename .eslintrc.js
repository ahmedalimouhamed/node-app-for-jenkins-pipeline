module.exports = {
    env: {
        node: true,
        es2021: true,
        jest: true
    },

    extends: ['eslint:recommended'], // sans espace

    parserOptions: {                // corrigé de parseOptions → parserOptions
        ecmaVersion: 12,
        sourceType: 'module'
    },

    rules: {
        'no-console': 'warn',
        'no-unused-vars' : 'error',
        'prefer-const': 'error'
    }
};
