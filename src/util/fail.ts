import { logError } from "./log";

export function fail(errMessage: string): void {
	failWith(new Error(errMessage));
}

export function failWith(err: Error): void {
	logError(">>>>> Build/Run Failed <<<<<");
	logError(err);
	process.exit(1);
}