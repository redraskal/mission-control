import { Route, html, Data, zod } from "gateway";
import { z } from "zod";
import { ensureServerNotSetup } from "../../../middleware/server";
import accounts from "../../../src/accounts";
import kv from "../../../src/kv";

export default class implements Route {
	@ensureServerNotSetup()
	async data(req: Request) {
		const data = await zod(
			req,
			z
				.object({
					username: z.string(),
					password: z.string(),
					confirm_password: z.string(),
				})
				.refine((data) => data.password === data.confirm_password, {
					message: "Passwords don't match",
					path: ["confirm_password"],
				})
		);
		if (data) {
			accounts.insert(data.username, data.username, data.password, true);
			kv.set("setup", "true");
			return {
				success: true,
			};
		}
	}

	head() {
		return html`
			<title>Setup - MISSION_CONTROL</title>
			<link rel="stylesheet" href="/css/style.css" />
			<link rel="stylesheet" href="/css/pages/login.css" />
		`;
	}

	body(data: Data<this>, err?: Error) {
		if (data?.success) return Response.redirect("/login");
		return html`
			<main>
				<progress value="2" max="3"></progress>
				<h1>Create admin account</h1>
				<p>Your admin account allows you to manage MISSION_CONTROL.</p>
				${err ? html` <p style="color: var(--primary)">Error! ${err?.message}</p> ` : ""}
				<form method="post">
					<label for="username">Username</label>
					<input type="text" id="username" name="username" placeholder="ben" required autofocus />
					<hr />
					<label for="password">Password</label>
					<input type="password" id="password" name="password" required />
					<label for="confirm_password">Confirm Password</label>
					<input type="password" id="confirm_password" name="confirm_password" required />
					<input type="submit" value="Continue" />
				</form>
				<div id="horizon"></div>
			</main>
		`;
	}
}
