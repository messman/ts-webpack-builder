import { fail } from './util/fail';
import { log } from './util/log';

/** Shared options between Library and Application builds. */
export interface BaseBuildOptions {
	/**
	 * Absolute path of the root of the project being built. Used to resolve with other options. 
	 * Needed if you're using a 'runner' file inside a subdirectory - like `path.resolve(__dirname, '../')`
	 * No default.
	 */
	absoluteRoot: string,
	/**
	 * Whether the target project is running in dev mode.
	 * 
	 * Default: true
	 */
	isDevelopment: boolean;
}

export const defaultBaseBuildOptions: BaseBuildOptions = {
	absoluteRoot: null!,
	isDevelopment: true
};

/** Helper to find a config in a dictionary and provide an error message if it's not found. */
export function findConfig<T extends BaseBuildOptions>(configName: string, allConfigs: { [key: string]: T; }): T {
	const config = allConfigs[configName];

	if (config) {
		log(`Using config '${configName}'`);
	}
	else {
		log(`Config name '${configName}' has no config object associated with it.`);
		const keys = Object.keys(allConfigs);
		console.log(`Valid configurations are (${keys.length}):`);
		keys.forEach((key) => {
			console.log(`\t${key}`);
		});
		fail(`Invalid config name '${configName}'`);
	}

	return config;
}