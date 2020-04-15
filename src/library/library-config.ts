import { BaseBuildOptions, defaultBaseBuildOptions } from "../config";

export interface LibraryBuildOptions extends BaseBuildOptions {
	/**
	 * Whether the build should also be a watch.
	 * Default: false
	 */
	watch: boolean,
	/**
	 * Whether to build for node. If false, builds for web.
	 * Default: true
	 */
	isNode: boolean,
	/**
	 * Whether to exclude node_modules from the build output.
	 * If false, your build output has everything it needs.
	 * If true, your build output is going to be used in a future build that will apply the node_modules.
	 * Libraries will likely exclude the node_modules.
	 * Default: true
	 */
	excludeNodeModules: boolean,
	/**
	 * Relative to the root, where is the entry file? (Only one supported.)
	 * Default: './src/index.ts'
	 */
	entryFileFromRoot: string,
	/**
	 * Relative to the root, where is the output directory?
	 * Default: './dist'
	 */
	outputFolderFromRoot: string,
	/**
	 * Relative to the output folder, where is the output file?
	 * Default: 'index.js'
	 */
	outputFileName: string,
	/**
	 * The name of the library created via umd.
	 * More information: https://webpack.js.org/configuration/output/#module-definition-systems
	 * Default: 'index'
	 */
	libraryName: string,
	/**
	 * If truthy, uses Babel to transpile down to es6/es2015.
	 * Should not need to be set for node libraries.
	 * Default: null
	 */
	babelConfig: {} | null,
	/**
	 * If true, logs extra information about this build.
	 * Default: false
	 */
	isDebug: boolean
}

export const defaultLibraryBuildOptions: LibraryBuildOptions = {
	...defaultBaseBuildOptions,
	watch: false,
	isNode: true,
	excludeNodeModules: true,
	entryFileFromRoot: './src/index.ts',
	outputFolderFromRoot: './dist/',
	outputFileName: 'index.js',
	libraryName: undefined!,
	babelConfig: null,
	isDebug: false
}
