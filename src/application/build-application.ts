import * as path from "path";
import * as file from "fs";
import { ApplicationBuildOptions, parseApplicationBuildType } from "./application-config";
import { fail, failWith } from "../util/fail";
import webpack from "webpack";
import { runtimeRequire } from "../util/dynamic-require";
import { runNodemon } from "./nodemon";
import { runWebpack } from "../util/webpack";

export function buildApplication(config: ApplicationBuildOptions): void {

	console.log('Starting new application build');

	// Use the root and the webpack config from root to get the webpack config.
	const webpackConfigFile = path.join(config.absoluteRoot, config.webpackConfigFileFromRoot);

	if (!file.existsSync(webpackConfigFile))
		fail(`webpack configuration file does not exist: '${webpackConfigFile}'`);

	// Confirm that the webpack config file is within the root. 
	if (webpackConfigFile.indexOf(config.absoluteRoot) === -1)
		fail(`webpack configuration file is not within project root: '${webpackConfigFile}'`);

	console.log(`Loading webpack config from '${webpackConfigFile}'`);
	const webpackConfigObject: webpack.Configuration = runtimeRequire(webpackConfigFile);

	// Parse build type
	const [build, watch, run] = parseApplicationBuildType(config.buildType);

	// We have to either build or run...
	if (!build && !run) {
		fail('Build type not supported');
	}

	// Get our nodemon file based off the context, output path, and output filename from webpack.
	let nodemonFile: string = null!;
	if (run) {
		const output = webpackConfigObject.output!;
		const outputPath = output.path!;
		const outputFilename = output.filename! as string;
		nodemonFile = path.resolve(outputPath, outputFilename);
	}

	if (!build && !watch && run) {
		// If we aren't building or watching, just run.
		runNodemon(nodemonFile);
	}
	else {
		// Run webpack first, then potentially run.
		runWebpack(webpackConfigObject, watch)
			.then(() => {
				if (run) {
					runNodemon(nodemonFile);
				}
			})
			.catch((e) => {
				failWith(e);
			});
	}
}