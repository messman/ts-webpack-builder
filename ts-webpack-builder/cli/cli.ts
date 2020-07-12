#!/usr/bin/env node

/*
	CLI to use for running from the command line instead of using a 'runner.ts' file in the consuming project.
	Additional benefit - don't have to specify the absoluteRoot, as it is assumed from the working directory.
*/

import * as path from 'path';
import * as yargs from 'yargs';

import { LibraryBuildOptions, buildLibrary } from '../dist/index';

interface ParsedBuildOptions extends Omit<LibraryBuildOptions, 'absoluteRoot' | 'babelConfig'> {
	babelConfigPath: string;
}

function parseArgs(): ParsedBuildOptions {
	// https://github.com/yargs/yargs-parser
	return yargs
		.usage('Usage: $0 [options]')
		.option('isDevelopment', {
			type: 'boolean',
		})
		.option('watch', {
			type: 'boolean',
		})
		.option('isNode', {
			type: 'boolean',
		})
		.option('excludeNodeModules', {
			type: 'boolean',
		})
		.option('entryFileFromRoot', {
			type: 'string',
		})
		.option('outputFolderFromRoot', {
			type: 'string',
		})
		.option('outputFileName', {
			type: 'string',
		})
		.option('libraryName', {
			type: 'string',
		})
		.option('babelConfigPath', {
			type: 'string',
		})
		.option('isDebug', {
			type: 'boolean',
		})
		.option('isDevelopmentForDebug', {
			type: 'boolean',
		})
		.strict()
		.argv as ParsedBuildOptions;
}

function main(): void {
	// Parse arguments (above).
	const args = parseArgs();
	const workingDirectory = process.cwd();

	// Load the babel config as a JSON config. (TODO: this is untested.)
	let babelConfig: {} | null = null;
	if (args.babelConfigPath) {
		babelConfig = require(path.resolve(workingDirectory, args.babelConfigPath));
	}

	const opts: LibraryBuildOptions = {
		...args,
		absoluteRoot: workingDirectory,
		babelConfig: babelConfig
	};

	buildLibrary(opts);
}

try {
	main();
} catch (e) {
	console.error('Error during execution:', e);
	process.exit(1);
}