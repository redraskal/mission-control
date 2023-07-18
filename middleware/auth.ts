import { MatchedRoute } from "bun";
import { RouteError } from "gateway";
import accounts, { Account } from "../src/accounts";
import sessions from "../src/sessions";

export function parseCookie(req: Request) {
	return req.headers
		.get("cookie")
		?.split(";")
		.reduce(
			(cookie, entry) => {
				var [name, value] = entry.trim().split("=");
				cookie[decodeURIComponent(name)] = decodeURIComponent(value);
				return cookie;
			},
			{} as Record<string, string>
		);
}

export function getSessionToken(req: Request) {
	const jsonToken = req.headers.get("authorization");
	const cookie = parseCookie(req)?.["houston"] || null;
	return jsonToken ? jsonToken : cookie;
}

export function getUser(req: Request) {
	// @ts-ignore
	if (req._account) return req._account as Account;
	const token = getSessionToken(req);
	const session = token ? sessions.get(token as string) : null;
	if (!session) return null;
	const account = accounts.byID(session.account_id);
	// @ts-ignore
	req._account = account;
	return account;
}

export function ensureSignedIn() {
	return function (_target: any, _descriptorKey: any, descriptor: any) {
		const original = descriptor.value;
		descriptor.value = function (req: Request, route: MatchedRoute) {
			if (!getUser(req)) {
				throw new RouteError("User not signed in", "/login");
			}
			return original.call(this, req, route);
		};
	};
}

export function ensureSignedOut() {
	return function (_target: any, _descriptorKey: any, descriptor: any) {
		const original = descriptor.value;
		descriptor.value = function (req: Request, route: MatchedRoute) {
			if (getUser(req)) {
				throw new RouteError("User signed in", "/");
			}
			return original.call(this, req, route);
		};
	};
}
