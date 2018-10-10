const path = require('path')
const webpack = require('webpack')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ArchivePlugin = require('webpack-archive-plugin');
const Dotenv = require('dotenv-webpack');
const UglifyJS = require("uglify-js");

module.exports = (env, argv) => {
  const config = {
    entry: './src/main.js',
    output: {
      path: path.resolve(__dirname, './dist'),
      filename: 'build.js'
    },
    watchOptions: {
      ignored: /node_modules/
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            'vue-style-loader',
            'css-loader'
          ],
        },
        {
          test: /\.scss$/,
          use: [
            'vue-style-loader',
            'css-loader',
            'sass-loader'
          ],
        },
        {
          test: /\.sass$/,
          use: [
            'vue-style-loader',
            'css-loader',
            'sass-loader?indentedSyntax'
          ],
        },
        {
          test: /\.vue$/,
          loader: 'vue-loader',
          options: {
            loaders: {
              // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
              // the "scss" and "sass" values for the lang attribute to the right configs here.
              // other preprocessors should work out of the box, no loader config like this necessary.
              'scss': [
                'vue-style-loader',
                'css-loader',
                'sass-loader'
              ],
              'sass': [
                'vue-style-loader',
                'css-loader',
                'sass-loader?indentedSyntax'
              ]
            }
            // other vue-loader options go here
          }
        },
        {
          test: /\.js$/,
          loader: 'babel-loader',
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
    plugins: [
      new CleanWebpackPlugin(['dist', 'build.zip']),
      new HtmlWebpackPlugin({ template: "index.html" }),
      new VueLoaderPlugin(),
      new CopyWebpackPlugin([
        {
          from: 'src/assets',
          to: 'assets',
          transform(content, path) {
            if (path.includes(".js") || argv.mode !== 'production')
              return content;
            return UglifyJS.minify(content.toString("utf8")).code;
          }
        },
        { from: 'src/manifest.json', to: 'manifest.json' }
      ]),
      new Dotenv()],
    resolve: {
      alias: {
        'vue$': 'vue/dist/vue.esm.js'
      },
      extensions: ['*', '.js', '.vue', '.json']
    },
    devServer: {
      historyApiFallback: true,
      noInfo: true,
      overlay: true
    },
    performance: {
      hints: false
    },
    devtool: '#source-map'
  };

  if (argv.mode === 'production') {
    // http://vue-loader.vuejs.org/en/workflow/production.html
    config.plugins = (config.plugins || []).concat([
      new webpack.DefinePlugin({ 'process.env': { NODE_ENV: '"production"' } }),
      new webpack.LoaderOptionsPlugin({
        minimize: true
      }),
      new UglifyJSPlugin({
        uglifyOptions: {
          output: {
            comments: false
          },
          compress: {
            warnings: false
          }
        }
      }),
      new ArchivePlugin({
        output: 'build',
        format: 'zip'
      })
    ])
  }
  return config;
}
