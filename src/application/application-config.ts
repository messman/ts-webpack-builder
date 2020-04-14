import { BaseBuildOptions } from "../config";

export interface ApplicationBuildOptions extends BaseBuildOptions {
	buildType: ApplicationBuildType
	webpackConfigFileFromRoot: string
}

export enum ApplicationBuildType {
	build = 0,
	build_watch = 1,
	run = 2,
	build_run = 3,
	build_watch_run = 4
}

/**
 * Parses the enum into a tuple.
 * Order: build, watch, run
 */
export function parseApplicationBuildType(buildType: ApplicationBuildType): [boolean, boolean, boolean] {
	let build = false;
	let watch = false;
	let run = false;
	switch (buildType) {
		case ApplicationBuildType.build:
			build = true;
			break;
		case ApplicationBuildType.build_watch:
			build = true;
			watch = true;
			break;
		case ApplicationBuildType.run:
			run = true;
			break;
		case ApplicationBuildType.build_run:
			build = true;
			run = true;
			break;
		case ApplicationBuildType.build_watch_run:
			build = true;
			watch = true;
			run = true;
			break;
	}
	return [build, watch, run];
}