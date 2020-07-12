const path = require('path');
const AutoPrefixer = require('autoprefixer');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const px2rem = require('postcss-px2rem');
const resolve = function resolve (dir) {
  return path.join(__dirname, '..', dir)
};
const version = require('./package').version;
const px2remConfigs = {
  baseDpr: 1,
  remUnit: 37.5
};
let output = {
  libraryTarget: "umd",
  path: path.resolve(__dirname, `./lib`),
  filename: '[name].js',
  library: '[name]',
  libraryExport: "default",
  publicPath: `/`,
};

const plugins = [
  new webpack.LoaderOptionsPlugin({
    vue: {
      postcss: [
        px2rem(px2remConfigs),
        AutoPrefixer({ browsers: ['last 20 versions'] }),
      ],
      loaders: {
        css: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader',
        }),
        less: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
            },
            {
              loader: 'less-loader',
            },
          ],
        }),
        sass: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
            },
            {
              loader: 'sass-loader',
            },
          ],
        }),
        scss: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
            },
            {
              loader: 'sass-loader',
            },
          ],
        }),
      },
    },
    options: {
      postcss: () => ([
        px2rem(px2remConfigs),
        AutoPrefixer({ browsers: ['last 20 versions'] }),
      ]),
    },
  }),
];

module.exports = {
  entry: {
    Rate: path.resolve(__dirname, './src/index')
  },
  output,
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.sass$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'sass-loader?indentedSyntax',
        ],
      },
      {
        test: /\.less$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'less-loader',
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
              'sass-loader',
            ],
            'sass': [
              'vue-style-loader',
              'css-loader',
              'sass-loader?indentedSyntax',
            ],
            'less':[
              'vue-style-loader',
              'css-loader',
              'less-loader',
            ]
          },
          // other vue-loader options go here
        },
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]',
        },
      },
    ],
  },
  plugins,
  performance: {
    hints: false,
  },
  devtool: '#eval-source-map',
};

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = false;
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"',
      }
    }),
    // new webpack.optimize.UglifyJsPlugin({
    //   sourceMap: true,
    //   compress: {
    //     warnings: false,
    //   },
    // }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
    }),
  ]);
}
