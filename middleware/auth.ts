import { MatchedRoute } from "bun";
import { RouteError } from "gateway";
import accounts, { Account } from "../src/accounts";
import sessions from "../src/sessions";

export function parseCookie(headers: Headers) {
	return headers
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

export function getSessionCookie(headers: Headers) {
	return parseCookie(headers)?.["houston"] || null;
}

export function getSessionToken(headers: Headers) {
	const jsonToken = headers.get("authorization")?.slice(6);
	const cookie = getSessionCookie(headers);
	return jsonToken ? jsonToken : cookie;
}

export function getAccount(context: Request | Headers) {
	const isRequest = context instanceof Request;
	// @ts-ignore
	if (context._account) return context._account as Account;
	const token = getSessionToken(isRequest ? context.headers : context);
	const session = token ? sessions.get(token as string) : null;
	if (!session) return null;
	const account = accounts.byID(session.account_id);
	// @ts-ignore
	if (isRequest) context._account = account;
	return account;
}

export function ensureSignedIn() {
	return function (_target: any, _descriptorKey: any, descriptor: any) {
		const original = descriptor.value;
		descriptor.value = function (req: Request, route: MatchedRoute) {
			if (!getAccount(req.headers)) {
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
			if (getAccount(req.headers)) {
				throw new RouteError("User signed in", "/");
			}
			return original.call(this, req, route);
		};
	};
}
