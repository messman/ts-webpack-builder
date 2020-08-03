// @ts-check
/**
 * @typedef { import('@messman/ts-webpack-builder').LibraryBuildOptions } LibraryBuildOptions
 */

/**
 * @type { LibraryBuildOptions['webpackConfigTransform'] }
 */
function configTransform(webpackConfig) {
	console.log('Testing from tswb.multi.js');
	return webpackConfig;
}

/**
 * @type {{ [key: string]: Partial<LibraryBuildOptions> }}
 */
const options = {
	one: {
		isDebug: true,
		libraryName: 'test-tswb-multi-one.js',
		isNode: false,
		webpackConfigTransform: configTransform
	},
	two: {
		isDebug: true,
		libraryName: 'test-tswb-multi-two.js',
		isNode: true,
		webpackConfigTransform: configTransform
	}
};

module.exports = options;