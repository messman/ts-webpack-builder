const packageJson = require('../../package.json');

const name = packageJson['name'];
const prefix = `[${name}] `;

export function logVersion(): void {
	const version = packageJson['version'];
	log(`v${version}`);
}

export function logLine(lines?: number) {
	const size = lines || 1;
	for (let i = 0; i < size; i++) {
		console.log();
	}
}

export function log(message?: any, ...optionalParams: any[]): void {
	console.log(`${prefix}${message}`, ...optionalParams);
}

export function logError(message?: any, ...optionalParams: any[]): void {
	console.error(`${prefix}${message}`, ...optionalParams);
}

export function logDebug(isDebug: boolean, message?: any, ...optionalParams: any[]): void {
	if (isDebug) {
		console.log(`${prefix}${message}`, ...optionalParams);
	}
}