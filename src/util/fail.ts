export function fail(errMessage: string): void {
	failWith(new Error(errMessage));
}

export function failWith(err: Error): void {
	console.error("\n>>>>> Build/Run Failed <<<<<");
	console.error(err);
	process.exit(1);
}