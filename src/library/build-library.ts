import { LibraryBuildOptions, defaultLibraryBuildOptions } from "./library-config";
import { createWebpackConfig } from "./library-webpack-config";
import { runWebpack } from "../util/webpack";
import { failWith } from "../util/fail";
import { logVersion, log, logDebug, logLine } from "../util/log";

/** Builds a library using the provided config. */
export function buildLibrary(config: Partial<LibraryBuildOptions>): void {

	logVersion();
	log('Starting new library build');
	logLine();

	// Fill in with defaults.
	const fullConfig: LibraryBuildOptions = { ...defaultLibraryBuildOptions, ...config };

	logDebug(fullConfig.isDebug, 'resolved config:', fullConfig);

	const webpackConfig = createWebpackConfig(fullConfig);

	logDebug(fullConfig.isDebug, 'webpack config:', webpackConfig);

	runWebpack(webpackConfig, fullConfig.watch)
		.catch((e) => {
			failWith(e);
		});
}