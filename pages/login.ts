import { Data, Route, RouteError, html, zod } from "gateway";
import { z } from "zod";
import { ensureSignedOut } from "../middleware/auth";
import { ensureServerSetup } from "../middleware/server";
import accounts from "../src/accounts";
import sessions from "../src/sessions";
import { nanoid } from "nanoid";

export default class implements Route {
	@ensureSignedOut()
	@ensureServerSetup()
	async data(req: Request) {
		const data = await zod(
			req,
			z.object({
				username: z.string(),
				password: z.string(),
				remember: z.string().optional(),
			})
		);
		if (data) {
			const account = accounts.byUsername(data.username);
			if (!account) throw new RouteError("Invalid credentials");
			const passwordMatch = await Bun.password.verify(data.password, account.password);
			if (passwordMatch) {
				const token = nanoid();
				sessions.insert(token, account.rowid);
				return {
					token,
				};
			}
			throw new RouteError("Invalid credentials");
		}
	}

	head() {
		return html`
			<title>Login - MISSION_CONTROL</title>
			<link rel="stylesheet" href="/css/style.css" />
			<link rel="stylesheet" href="/css/pages/login.css" />
		`;
	}

	body(data: Data<this>, err?: Error) {
		if (data?.token) {
			return Response.redirect("/", {
				headers: {
					"set-cookie": `houston=${encodeURIComponent(data.token)}; Secure; HttpOnly`,
				},
			});
		}
		return html`
			<main>
				<h1>MISSION_CONTROL</h1>
				${err ? html` <p style="color: var(--primary)">Error! ${err?.message}</p> ` : ""}
				<form method="post">
					<label for="username">Username</label>
					<input type="text" id="username" name="username" autofocus required />
					<label for="password">Password</label>
					<input type="password" id="password" name="password" required />
					<input type="submit" value="Login" />
				</form>
				<div id="horizon"></div>
			</main>
		`;
	}
}
