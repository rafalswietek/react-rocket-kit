const HtmlWebPackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const htmlPlugin = new HtmlWebPackPlugin({
  template: './src/index.html',
  filename: 'index.html',
});

const extractTextPlugin = new ExtractTextPlugin({
  filename: 'assets/style.[hash:8].css',
  allChunks: true,
});

const copyPlugin = new CopyWebpackPlugin([
  {
    from: 'src/public',
  },
]);

module.exports = {
  output: {
    filename: 'assets/main.[hash:8].js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.(png|jpg|gif|ico|svg|eot|ttf|woff|woff2)$/,
        loader: 'url-loader',
        options: {
          limit: 25000,
          outputPath: '/assets/',
          name: '[name].[hash:8].[ext]',
        },
      },
      {
        test: /\.(scss|sass|css)$/i,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'css-loader' },
            { loader: 'postcss-loader', options: { sourceMap: true } },
            { loader: 'sass-loader', options: { sourceMap: true } },
          ],
        }),
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
  },
  plugins: [htmlPlugin, extractTextPlugin, copyPlugin],
  devServer: {
    historyApiFallback: {
      rewrites: [
        { from: /^\/$/, to: '/index.html' },
      ],
    },
  },
};
