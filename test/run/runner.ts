#!/usr/bin/env node

import * as Builder from "ts-webpack-builder";
import * as path from "path";

/*
	This file is called with arguments from package.json.
	See below for options.

	Call with something like
	node runner.js (calls default)
	or
	node runner.js -- build:once
*/

// Get the first arg (Passed in if -- is used to separate)
let configName = process.argv[2] || null;
const root = path.resolve(__dirname, "../");

if (configName) {
	// Test using the findConfig.
	const config = Builder.findConfig(configName, {
		// Test using a library name.
		'build:once': Builder.createNodeLibraryConfig(root, 'tsWebpackBuilderTest'),
		// Test using watch.
		'build:watch': {
			...Builder.createNodeLibraryConfig(root, 'tsWebpackBuilderTest'),
			watch: true
		}
	});
	Builder.buildLibrary(config);
}
else {
	// Test using the regular object input.
	Builder.buildLibrary({
		absoluteRoot: root
	});
}