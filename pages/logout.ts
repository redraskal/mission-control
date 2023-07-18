import { Route } from "gateway";
import { ensureSignedIn, getSessionToken } from "../middleware/auth";
import sessions from "../src/sessions";

export default class implements Route {
	@ensureSignedIn()
	async data(req: Request) {
		const token = getSessionToken(req)!;
		sessions.invalidate(token);
		return {};
	}

	body() {
		return Response.redirect("/login", {
			headers: {
				"Set-Cookie": "houston=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT",
			},
		});
	}
}
