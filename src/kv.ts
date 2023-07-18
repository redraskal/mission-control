import KV from "bun-kv";
import database from "./database";

const _kv = new KV(database);

export default class kv {
	static get(key: string) {
		return _kv.get(key);
	}

	static set(key: string, value: string) {
		return _kv.set(key, value);
	}

	static remove(key: string) {
		return _kv.remove(key);
	}
}
