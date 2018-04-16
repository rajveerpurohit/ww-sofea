const PATHS = require('../paths');

module.exports = ({ production = false, browser = false } = {}) => {
  const enableHotModuleReplacement = !production && browser;
  const createPresets = (enableHotModuleReplacement) => {
    const presets = [
      [
        'env',
        {
          'targets': {
            'browsers': ['last 2 versions', 'ie >= 9']
          },
          'useBuiltIns': true
          // 'debug': true
        }
      ],
      'react',
      'stage-0'
    ];

    return enableHotModuleReplacement ? ['react-hmre', ...presets] : presets;
  };
  const presets = createPresets(enableHotModuleReplacement);

  const plugins = production ? [
    'transform-decorators-legacy',
    'transform-class-properties',
    'transform-react-constant-elements',
    'transform-react-remove-prop-types',
    'lodash'
  ] : ['lodash'];

  return {
    test: /\.js$|\.jsx$/,
    loader: 'babel-loader',
    options: {
      presets,
      plugins
    },
    exclude: PATHS.modules
  };
};
