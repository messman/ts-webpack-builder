/*
	Root of the library. Exports other code.
*/

export { BaseBuildOptions, findConfig } from './config';

export { buildLibrary, constructConfigs } from './library/build-library';
export * from './library/library-config';
export * from './library/build-library-helpers';
// For the CLI
export { log, logError } from './util/log';