import * as path from 'path';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import * as nodeExternals from 'webpack-node-externals';
import { LibraryBuildOptions } from './library-config';
import { Configuration } from "webpack";

/*
	References:
	- Webpack itself: https://webpack.js.org/guides/author-libraries/
	- https://medium.com/code-oil/webpack-javascript-bundling-for-both-front-end-and-back-end-b95f1b429810
*/
export function createWebpackConfig(options: LibraryBuildOptions): Configuration {

	const outputPath = path.resolve(options.absoluteRoot, options.outputFolderFromRoot);
	// The parent of the *output* npm package dist directory.
	const rootDir = path.resolve(__dirname, '../node_modules');

	const config: Configuration = {};

	// https://webpack.js.org/configuration/mode/
	config.mode = options.isDevelopment ? 'development' : 'production';

	// https://webpack.js.org/configuration/target/
	config.target = options.isNode ? 'node' : 'web';

	// https://webpack.js.org/configuration/entry-context/
	config.context = options.absoluteRoot;
	config.entry = options.entryFileFromRoot;

	// https://webpack.js.org/configuration/output/
	config.output = {
		path: outputPath,
		filename: options.outputFileName,

		//https://webpack.js.org/configuration/output/#module-definition-systems
		libraryTarget: 'umd'
	}

	if (options.libraryName) {
		config.output.library = options.libraryName;
	}

	if (options.excludeNodeModules) {
		config.externals = [
			// Exclude node_modules from bundling
			nodeExternals()
		];
	}

	// https://webpack.js.org/configuration/resolve/
	config.resolve = {
		extensions: ['.ts', '.js', '.json']
	};

	// help webpack find the `ts-loader` that is part of this project
	// https://webpack.js.org/configuration/resolve/#resolveloader
	config.resolveLoader = {
		modules: ['node_modules', rootDir]
	};

	// https://webpack.js.org/configuration/module/

	let typeScriptLoaders: {}[] = [
		// First
		{
			loader: 'ts-loader'
		}
	];

	if (options.babelConfig) {
		// https://github.com/babel/babel-loader
		typeScriptLoaders.push({
			loader: 'babel-loader',
			options: options.babelConfig
		});
	}

	typeScriptLoaders = typeScriptLoaders.reverse();

	config.module = {
		rules: [
			{
				test: /\.tsx?$/,
				exclude: /[\\/]node_modules[\\/]/,
				use: typeScriptLoaders
			}
		]
	}

	config.plugins = [
		// Clean the "dist" folder each time
		new CleanWebpackPlugin()
	]

	return config;
}