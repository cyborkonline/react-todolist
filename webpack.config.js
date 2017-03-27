const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './client/index.html',
  filename: 'index.html',
  inject: 'body'
})
const ExtractTextPlugin= require('extract-text-webpack-plugin')

module.exports = {
  entry: [
      './client/index'
    ],

    output: {
      path: path.join(__dirname, '/client'),
      publicPath: '/',
      filename: 'bundle.js'
    },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ ,     query: {
        presets: ["es2015", "react"]
    }},
      {   test: /\.(sass|scss)$/,        use: ExtractTextPlugin.extract({
				fallback: "style-loader",
				use: {
					loader: "css-loader", "sass-loader",
					options: {
						sourceMap: true
					}
				},
				publicPath: "../"
			})      }
    ]
  },
plugins: [HtmlWebpackPluginConfig,		new ExtractTextPlugin({
			filename: "css/[name].css?[hash]-[chunkhash]-[contenthash]-[name]",
			disable: false,
			allChunks: true
		})]
}
