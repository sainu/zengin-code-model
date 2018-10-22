var path = require('path')
var webpack = require('webpack')

module.exports = (env, argv) => {
  const PRODUCTION = env.mode == 'production'
  let plugins = [ ]
  if (PRODUCTION) {
    plugins.concat([
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: '"production"'
        }
      }),
      // webpack4から'mode=production'にすると自動でuglifyされるので不要
      // new webpack.optimize.UglifyJsPlugin({
      //   sourceMap: true,
      //   compress: {
      //     warnings: false
      //   }
      // }),
      new webpack.LoaderOptionsPlugin({
        minimize: true
      })
    ])
  }

  return {
    entry: './src/index.ts',
    output: {
      path: path.resolve(__dirname, './dist'),
      publicPath: '/dist/',
      filename: 'build.js',
      library: 'ZenginCodeModel',
      libraryTarget: 'umd'
    },
    mode: 'development',
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: 'ts-loader',
          exclude: /node_modules/
        },
        {
          test: /\.(png|jpg|gif|svg)$/,
          loader: 'file-loader',
          options: {
            name: '[name].[ext]?[hash]'
          }
        }
      ]
    },
    resolve: {
      extensions: ['.ts', '.js', '.json']
    },
    devServer: {
      historyApiFallback: true,
      noInfo: true
    },
    performance: {
      hints: false
    },
    devtool: PRODUCTION ? false : '#eval-source-map',
    plugins: plugins
  }
}
