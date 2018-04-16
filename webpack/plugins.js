const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = ({ production = false, browser = false } = {}) => {
  const bannerOptions = { raw: true, banner: 'require("source-map-support").install();' };
  const compileTimeConstantForMinification = { __PRODUCTION__: JSON.stringify(production) }; // v3 'process.env.NODE_ENV': JSON.stringify('production')

  const compress = {
    unused: true,
    dead_code: true, // big one--strip code that will never execute
    warnings: false, // good for prod apps so users can't peek behind curtain
    drop_debugger: true,
    conditionals: true,
    evaluate: true,
    drop_console: false, // strips console statements
    sequences: true,
    booleans: true,
  };

  if (!production && !browser) {
    return [
      new webpack.EnvironmentPlugin(['NODE_ENV']),
      new webpack.DefinePlugin(compileTimeConstantForMinification),
      new webpack.BannerPlugin(bannerOptions),
      //new BundleAnalyzerPlugin({ analyzerPort: 4000})
    ];
  }

  if (!production && browser) {
    return [
      new webpack.EnvironmentPlugin(['NODE_ENV']),
      new webpack.DefinePlugin(compileTimeConstantForMinification),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
      //new BundleAnalyzerPlugin({ analyzerPort: 4000})
    ];
  }

  if (production && !browser) {
    return [
      new webpack.EnvironmentPlugin(['NODE_ENV']),
      new webpack.DefinePlugin(compileTimeConstantForMinification),
      new webpack.BannerPlugin(bannerOptions),
      new webpack.optimize.UglifyJsPlugin({ compress })
     //new BundleAnalyzerPlugin({ analyzerPort: 4000})
    ];
  }

  if (production && browser) {
    return [
      new webpack.EnvironmentPlugin(['NODE_ENV']),
      new webpack.DefinePlugin(compileTimeConstantForMinification),
      new webpack.optimize.UglifyJsPlugin({ compress }),
      new ExtractTextPlugin({
        filename: '[contenthash].css',
        allChunks: true
      }),
      new ManifestPlugin({
        fileName: 'manifest.json'
      })
      // new BundleAnalyzerPlugin({ analyzerPort: 4000})
    ];
  }

  return [];
};
