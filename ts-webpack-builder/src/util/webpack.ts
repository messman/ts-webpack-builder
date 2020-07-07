import * as webpack from "webpack";
import { logError, log, logLine } from "./log";

/** Runs webpack config object and returns a promise that resolves after the first build. */
export function runWebpack(webpackConfig: {}, watch: boolean): Promise<void> {

	let isFirst = true;

	return new Promise((resolve, reject) => {

		function callback(error: Error, stats: webpack.Stats) {
			// Let us know if this was the initial build or new build.
			const wasFirst = isFirst;
			isFirst = false;
			logLine();
			let outputText = wasFirst ? "Initial webpack build complete" : "Webpack rebuild complete";
			log(outputText);

			// Output stats about the build.
			try {
				processWebpackBuild(error, stats, wasFirst);
			}
			catch (e) {
				reject(e);
				return;
			}

			logLine();
			if (watch)
				log("Webpack is watching for changes...");
			else
				log("Done with webpack.");

			if (wasFirst) {
				// Fulfill promise on first build, though we may keep going.
				resolve();
			}
		}

		// https://webpack.js.org/api/node/
		try {
			const compiler = webpack(webpackConfig);
			if (watch)
				compiler.watch({}, callback);
			else
				compiler.run(callback);
		}
		catch (e) {
			reject(e);
		}
	});
}

function processWebpackBuild(error: Error, stats: webpack.Stats, wasFirst: boolean): void {
	// Show webpack errors (larger configuration issues)
	if (error) {
		logError(error.stack || error);
		throw new Error("Webpack compilation failed - major error");
	}

	// Show statistics.
	// https://webpack.js.org/configuration/stats/
	console.log(stats.toString({
		assets: true,
		excludeAssets: (assetName) => {
			return assetName.endsWith('.d.ts') || assetName.endsWith('.d.ts.map');
		},
		builtAt: true,
		cached: false,
		chunks: false,
		colors: true,
		chunkModules: false,
		chunkOrigins: false,
		errors: true,
		errorDetails: true,
		hash: false,
		modules: false,
		performance: true,
		reasons: true,
		timings: true,
		warnings: true,
		version: false,
	}));

	const failFirstBuild = wasFirst && stats.hasErrors();
	if (failFirstBuild) {
		throw new Error("Webpack compilation failed - first-time errors");
	}
}