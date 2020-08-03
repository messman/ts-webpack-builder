#!/usr/bin/env node
//@ts-check

const webpackBuilder = require('@messman/ts-webpack-builder');
const path = require('path');

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
const root = path.resolve(__dirname, '../');

if (configName) {
	// Test using the findConfig.
	const config = webpackBuilder.findConfig(configName, {
		// Test using a library name.
		'build:once': webpackBuilder.createNodeLibraryConfig(root, 'tsWebpackBuilderTest'),
		// Test using watch.
		'build:watch': {
			...webpackBuilder.createNodeLibraryConfig(root, 'tsWebpackBuilderTest'),
			watch: true
		},
		// Test building a client library.
		'build:client': {
			...webpackBuilder.createClientLibraryConfig(root, 'tsWebpackBuilderTest'),
			babelConfig: null
		},
	});
	webpackBuilder.buildLibrary(config);
}
else {
	// Test using the regular object input.
	webpackBuilder.buildLibrary({
		absoluteRoot: root
	});
}