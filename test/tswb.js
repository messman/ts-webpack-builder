// @ts-check
/**
 * @typedef { import('@messman/ts-webpack-builder').LibraryBuildOptions } LibraryBuildOptions
 */
/**
 * @type Partial<LibraryBuildOptions>
 */
const options = {
	libraryName: 'test-tswb.js',
	webpackConfigTransform: (webpackConfig, buildOptions) => {
		console.log('Testing from tswb.js - webpackConfig.output.filename, buildOptions.libraryName:', webpackConfig.output?.filename, buildOptions.libraryName);
		if (buildOptions.isDebug) {
			console.log('Testing from tswb.js - isDebug is true');
		}
		return webpackConfig;
	}
};

module.exports = options;