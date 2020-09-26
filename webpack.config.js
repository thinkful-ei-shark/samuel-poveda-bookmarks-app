const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
	resolve: {
		alias: {
			store$: path.resolve(__dirname, 'src/Components/store.js'),
			api$: path.resolve(__dirname, 'src/api')
		},
		mainFiles: ['index']
	},
  entry: './src/index.js',
  output: {
    path: __dirname + '/dist',
    filename: 'index_bundle.js'
  },
  mode: 'development',
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      }
    ]
  }
};
