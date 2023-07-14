import { Route, html } from "gateway";

export default class implements Route {
	head() {
		return html`
			<title>Mission Control</title>
			<link rel="stylesheet" href="/css/style.css" />
			<link rel="stylesheet" href="/css/pages/login.css" />
		`;
	}

	body() {
		return html`
			<main>
				<h1>MISSION_CONTROL</h1>
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
