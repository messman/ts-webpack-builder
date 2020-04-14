import { LibraryBuildOptions, defaultLibraryBuildOptions } from "./library-config";
import { createWebpackConfig } from "./library-webpack-config";
import { runWebpack } from "../util/webpack";
import { failWith } from "../util/fail";

/** Builds a library using the provided config. */
export function buildLibrary(config: Partial<LibraryBuildOptions>): void {

	console.log('Starting new library build');

	// Fill in with defaults.
	const fullConfig: LibraryBuildOptions = { ...defaultLibraryBuildOptions, ...config };

	const webpackConfig = createWebpackConfig(fullConfig);

	runWebpack(webpackConfig, fullConfig.watch)
		.catch((e) => {
			failWith(e);
		});
}