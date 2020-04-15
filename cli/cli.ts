#!/usr/bin/env node

import path from 'path';
import * as yargs from 'yargs';

import { LibraryBuildOptions, buildLibrary } from '../dist/index';

interface ParsedBuildOptions extends Omit<LibraryBuildOptions, 'absoluteRoot' | 'babelConfig'> {
	babelConfigPath: string
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
		.strict()
		.example('$0 blah', 'test')
		.argv as ParsedBuildOptions;
}

function main(): void {
	const args = parseArgs();
	const workingDirectory = process.cwd();

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