import * as webpack from "webpack";

/** Runs webpack config object and returns a promise that resolves after the first build. */
export function runWebpack(webpackConfig: {}, watch: boolean): Promise<void> {

	let isFirst = true;

	return new Promise((resolve, reject) => {

		function callback(error: Error, stats: webpack.Stats) {
			// Let us know if this was the initial build or new build.
			const wasFirst = isFirst;
			isFirst = false;
			let outputText = wasFirst ? "\nInitial webpack build complete" : "\nWebpack rebuild complete";
			console.log(outputText);

			// Output stats about the build.
			try {
				processWebpackBuild(error, stats, wasFirst);
			}
			catch (e) {
				reject(e);
				return;
			}

			if (watch)
				console.log("\nWebpack is watching for changes...\n");
			else
				console.log("\nDone with webpack.\n");

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
		console.error(error.stack || error);
		throw new Error("Webpack compilation failed - major error");
	}

	// Show statistics.
	// https://webpack.js.org/configuration/stats/
	console.log(stats.toString({
		assets: true,
		builtAt: true,
		cached: false,
		chunks: false,
		colors: true,
		chunkModules: false,
		chunkOrigins: false,
		errors: true,
		errorDetails: false,
		hash: true,
		modules: false,
		performance: true,
		reasons: true,
		timings: true,
		warnings: true,
		version: false,
	}));

	const failFirstBuild = wasFirst && stats.hasErrors();
	if (failFirstBuild)
		throw new Error("Webpack compilation failed - first-time errors");
}