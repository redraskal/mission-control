import { Route, html } from "gateway";
import { ensureServerNotSetup } from "../../../middleware/server";

export default class implements Route {
	head() {
		return html`
			<title>Welcome - MISSION_CONTROL</title>
			<link rel="stylesheet" href="/css/style.css" />
			<link rel="stylesheet" href="/css/pages/login.css" />
		`;
	}

	@ensureServerNotSetup()
	body() {
		return html`
			<main>
				<progress value="1" max="3"></progress>
				<h1>TODO.</h1>
				<p>Welcome to MISSION_CONTROL.</p>
				<a href="/server/setup/account">
					<button>Setup account</button>
				</a>
				<div id="horizon"></div>
			</main>
		`;
	}
}
