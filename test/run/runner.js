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
	node runner.js -- build once
	node runner.js -- build
	node runner.js -- config once
	node runner.js -- config
*/

// Get the first arg (Passed in if -- is used to separate)
const buildOrConfigArg = process.argv[2] || null;
const configName = process.argv[3] || null;
const root = path.resolve(__dirname, '../');

/** @type Partial<import('@messman/ts-webpack-builder').LibraryBuildOptions> */
let config = {};
if (configName) {
	// Test using the findConfig.
	config = webpackBuilder.findConfig(configName, {
		// Test using a library name.
		'once': webpackBuilder.createNodeLibraryConfig(root, 'tsWebpackBuilderTest'),
		// Test using watch.
		'watch': {
			...webpackBuilder.createNodeLibraryConfig(root, 'tsWebpackBuilderTest'),
			watch: true
		},
		// Test building a client library.
		'client': {
			...webpackBuilder.createClientLibraryConfig(root, 'tsWebpackBuilderTest'),
			babelConfig: null
		},
	});
}
else {
	// Test using the regular object input.
	config = {
		absoluteRoot: root
	};
}

console.log(`Run test with '${buildOrConfigArg}' and '${configName}'`);
if (buildOrConfigArg === 'build') {
	webpackBuilder.buildLibrary(config);
}
else {
	const [fullConfig, webpackConfig] = webpackBuilder.constructConfigs(config);
	console.log({ fullConfig, webpackConfig });
}