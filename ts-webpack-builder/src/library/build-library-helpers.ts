/*
	Common-sense helpers to reduce code in the CLI or the consuming project.
*/

import { defaultLibraryBuildOptions, LibraryBuildOptions } from './library-config';

export function createNodeLibraryConfig(absoluteRoot: string, name: string): LibraryBuildOptions {
	return {
		...defaultLibraryBuildOptions,
		absoluteRoot: absoluteRoot,
		libraryName: name
	};
}

export function createClientLibraryConfig(absoluteRoot: string, name: string): LibraryBuildOptions {
	return {
		...defaultLibraryBuildOptions,
		absoluteRoot: absoluteRoot,
		libraryName: name,
		isNode: false
	};
}