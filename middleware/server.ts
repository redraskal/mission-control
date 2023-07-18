import { RouteError } from "gateway";
import kv from "../src/kv";

export function ensureServerSetup() {
	return function (_target: any, _descriptorKey: any, descriptor: any) {
		const original = descriptor.value;
		descriptor.value = function (...args: any[]) {
			if (!kv.get("setup")) {
				throw new RouteError("Server not setup", "/server/setup");
			}
			return original.apply(this, args);
		};
	};
}

export function ensureServerNotSetup() {
	return function (_target: any, _descriptorKey: any, descriptor: any) {
		const original = descriptor.value;
		descriptor.value = function (...args: any[]) {
			if (kv.get("setup")) {
				throw new RouteError("Server already setup", "/login");
			}
			return original.apply(this, args);
		};
	};
}
