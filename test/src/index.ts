import { sayHello, sayName } from "./advanced";

export function introduceSelf(name: string): string {
	return sayHello(sayName(name));
}