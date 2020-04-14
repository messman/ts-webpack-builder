const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { plugin: BundleDTSPlugin } = require('bundle-dts');
const nodeExternals = require("webpack-node-externals");

module.exports = {
	mode: "development",
	target: "node",

	context: __dirname,
	entry: "./src/index.ts",
	output: {
		filename: "index.js",
		path: path.resolve(__dirname, "./dist"),
		// Make a library
		libraryTarget: 'umd',
	},

	externals: [
		// Exclude node_modules from bundling
		nodeExternals()
	],
	node: {
		// true: use source location, false: use webpack output location
		// https://webpack.js.org/configuration/node/#node-__filename
		// Use 'true' so logger will log source file.
		__dirname: true,
		__filename: true
	},

	resolve: {
		// Add '.ts' as a resolvable extension (so that you don't need to type out the extension yourself).
		extensions: [".ts", ".js", ".json"],
	},
	module: {
		rules: [
			{
				test: /\.ts?$/,
				exclude: /[\\/]node_modules[\\/]/,
				loaders: ["ts-loader"]
			},
		]
	},
	plugins: [
		// Clean the output folder each time
		new CleanWebpackPlugin(),
		new BundleDTSPlugin({
			entry: "./src/index.ts",
			outFile: "./dist/index.d.ts"
		})
	]
};