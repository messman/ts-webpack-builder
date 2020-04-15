/*
	Root of the library. Exports other code.
*/

export { BaseBuildOptions, findConfig } from './config';

export { buildApplication } from './application/build-application';
export * from './application/application-config';

export { buildLibrary } from './library/build-library';
export * from './library/library-config';
export * from './library/build-library-helpers';