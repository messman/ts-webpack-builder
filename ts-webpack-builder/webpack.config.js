const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

// This config is very similar to the one created in code in src - check there for more info.

module.exports = {
	mode: 'development',
	target: 'node',

	context: __dirname,
	entry: './src/index.ts',
	output: {
		filename: 'index.js',
		path: path.resolve(__dirname, './dist'),
		libraryTarget: 'umd',
		library: 'tsWebpackBuilder'
	},

	externals: [
		nodeExternals()
	],
	node: {
		__dirname: false,
		__filename: false
	},

	resolve: {
		extensions: ['.ts', '.js', '.json'],
	},
	module: {
		rules: [
			{
				test: /\.ts?$/,
				exclude: /[\\/]node_modules[\\/]/,
				loaders: ['ts-loader']
			},
		]
	},
	plugins: [
		new CleanWebpackPlugin(),
	]
};