module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  plugins: ['@typescript-eslint'],
  extends: ['airbnb-typescript/base'],
  rules: {
    'no-console': ['warn', { allow: ['warn', 'error'] }],
  },
};
