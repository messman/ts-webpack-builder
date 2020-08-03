import { BaseBuildOptions, defaultBaseBuildOptions } from "../config";
import { Configuration } from 'webpack';

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
	 * If false, your build output has everything it needs (dependencies bundled in).
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
	 * If true, logs extra information about this build with this tool.
	 * Default: false
	 */
	isDebug: boolean,
	/**
	 * If true, uses more expensive source-mapping to create a full debug version of the code back to its TypeScript source.
	 * Only used when in development mode.
	 * Default: false
	 */
	isDevelopmentForDebug: boolean;
	/**
	 * If set to a tuple, adds an alias entry into the webpack configuration to support importing with that alias.
	 * Also requires configuration setup in the consuming project's tsconfig.json.
	 * Not accessible through the CLI.
	 * First tuple argument is the alias, second tuple argument is the directory relative to the project root that the alias applies to.
	 * Example: ['@', './src'] becomes '@': path.resolve(__dirname, './src') and requires a tsconfig.json setting of "paths": { "@/*": [ "src/*" ] }
	 * Default: ['@', './src']
	 */
	rootAlias: [string, string] | null;
	/**
	 * If set to a function, provides the current webpack configuration to the function for full customization.
	 * Not accessible through the CLI.
	 * Default: null
	 */
	webpackConfigTransform: ((config: Configuration, buildOptions: LibraryBuildOptions) => Configuration) | null;
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
	isDebug: false,
	isDevelopmentForDebug: false,
	rootAlias: ['@', './src'],
	webpackConfigTransform: null
};
