/*
	Root of the library. Exports other code.
*/

export { BaseBuildOptions, findConfig } from './config';

export { buildLibrary } from './library/build-library';
export * from './library/library-config';
export * from './library/build-library-helpers';