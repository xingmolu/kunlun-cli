// eslint-disable-next-line @typescript-eslint/no-var-requires
const createResolvePath = require('babel-plugin-tsconfig-paths-module-resolver/create-resolve');

const defaultResolvePath = createResolvePath();

module.exports = function (api) {
  api.cache(true);

  const presets = ['@babel/preset-react', '@babel/typescript'];

  const plugins = [
    'babel-plugin-transform-typescript-metadata',
    '@babel/plugin-transform-runtime',
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    '@babel/plugin-proposal-export-namespace-from',
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-logical-assignment-operators',
  ];

  return {
    presets,
    plugins,
    only: ['**/*.ts', '**/*.tsx'],
    //  in generator/src/templates, babel should only compile files NOT ends with tpl.ts
    ignore: [/generator\/src\/templates\/([^/]+\/)*.+(?<!(tpl|desc).)tsx?$/],
  };
};