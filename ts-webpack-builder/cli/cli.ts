#!/usr/bin/env node

/*
	CLI to use for running from the command line instead of using a 'runner.ts' file in the consuming project.
	Additional benefit - don't have to specify the absoluteRoot, as it is assumed from the working directory.
*/

import * as path from 'path';
import * as yargs from 'yargs';

import { LibraryBuildOptions, buildLibrary, findConfig } from '../dist/index';

interface ParsedBuildOptions extends Omit<LibraryBuildOptions, 'absoluteRoot' | 'babelConfig' | 'rootAlias' | 'webpackConfigTransform'> {
	babelConfigPath: string;
	configFile: string;
	configFileKey: string;
}

const defaultConfigFile = 'tswb.js';

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
		.option('configFile', {
			type: 'string',
			default: defaultConfigFile,
			description: 'Configuration file for this tool, similar to webpack.config.js or tsconfig.json. File can return an object or function.'
		})
		.option('configFileKey', {
			type: 'string',
			description: 'Key to use in the dictionary returned from the configuration file, to support multiple configurations.'
		})
		.strict()
		.argv as ParsedBuildOptions;
}

function main(): void {
	// Parse arguments (above).
	const args = parseArgs();
	const workingDirectory = process.cwd();

	// Check for a configuration file.
	let fileConfig: Partial<LibraryBuildOptions> = {};
	if (args.configFile) {
		try {
			fileConfig = require(path.resolve(workingDirectory, args.configFile));
			if (fileConfig instanceof Function) {
				fileConfig = fileConfig();
			}

			// If we have a key, assume the object we now have is actually a dictionary of multiple configurations.
			if (args.configFileKey) {
				const dictionary = fileConfig as unknown as { [key: string]: LibraryBuildOptions; };
				fileConfig = findConfig(args.configFileKey, dictionary);
			}
		}
		catch (e) {
			if (args.configFile !== defaultConfigFile) {
				console.error(`Could not locate or load file '${args.configFile}' as argument to 'configFile'`, e);
			}
		}
	}

	// Construct our options from the file first, then any modifiers from the command line args.
	const opts: Partial<LibraryBuildOptions> = { ...fileConfig, ...args };

	// Perhaps our absolute root has already been specified... not sure why it would be, but use it if it is.
	opts.absoluteRoot = opts.absoluteRoot || workingDirectory;

	// Load the babel config as a JSON config. (TODO: this is untested.)
	if (args.babelConfigPath) {
		opts.babelConfig = require(path.resolve(opts.absoluteRoot, args.babelConfigPath));
	}

	buildLibrary(opts);
}

try {
	main();
} catch (e) {
	console.error('Error during execution:', e);
	process.exit(1);
}