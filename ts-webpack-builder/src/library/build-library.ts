import { LibraryBuildOptions, defaultLibraryBuildOptions } from './library-config';
import { createWebpackConfig } from './library-webpack-config';
import { runWebpack } from '../util/webpack';
import { failWith } from '../util/fail';
import { logVersion, log, logDebug, logLine } from '../util/log';
import * as path from 'path';
import { runtimeRequire } from '../util/dynamic-require';

/** Builds a library using the provided config. */
export function buildLibrary(config: Partial<LibraryBuildOptions>): void {

	logVersion();
	logLine();
	log('Starting new library build');

	// Fill in with defaults.
	const fullConfig: LibraryBuildOptions = { ...defaultLibraryBuildOptions, ...config };

	logDebug(fullConfig.isDebug, 'resolved config:', fullConfig);

	const webpackConfig = createWebpackConfig(fullConfig);

	logDebug(fullConfig.isDebug, 'webpack config:', webpackConfig);

	// Try to output the information in the package.json of the target/consuming project
	try {
		const targetPackageJson = runtimeRequire(path.resolve(fullConfig.absoluteRoot, './package.json'));
		const targetName = targetPackageJson['name' as keyof typeof targetPackageJson];
		const targetVersion = targetPackageJson['version' as keyof typeof targetPackageJson];
		if (targetName && targetVersion) {
			log(`Target: ${targetName} v${targetVersion}`);
		}
	}
	catch { }

	runWebpack(webpackConfig, fullConfig.watch)
		.catch((e) => {
			failWith(e);
		});
}