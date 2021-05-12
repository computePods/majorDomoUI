// .storybook/main.js

const path = require('path');

module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.js"
  ],
  "addons": [
    "@storybook/addon-a11y",
    "@storybook/addon-essentials",
    "@storybook/addon-jest",
    "@storybook/addon-links",
    "@storybook/addon-storysource"
  ],
  "webpackFinal": async (config, { configType }) => {
    console.log('---------------------------------------------------------')
    console.log(config)
    // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
    // You can change the configuration based on that.
    // 'PRODUCTION' is used when building the static version of storybook.

    // The 'resolve.alias'es are a collection of import path aliases
    // we explicitly add an '@cpmd' to our own source
    //
    config.resolve.alias['@cpmd']  = path.resolve(__dirname, '../src');
    config.resolve.alias['@bulma'] = path.resolve(__dirname, '../node_modules/bulma');
    config.resolve.alias['@prismjs'] = path.resolve(__dirname, '../node_modules/prismjs');

    // The 'modules.rules' is a list of webpack loader rules
    // we explicitly add loader rules for the use of SASS scss formated files
    //
    config.module.rules.push({
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'sass-loader'],
      include: path.resolve(__dirname, '../'),
    });

    console.log('---------------------------------------------------------')
    console.log(config)
    console.log('---------------------------------------------------------')
    // Return the altered config
    return config;
  },
}