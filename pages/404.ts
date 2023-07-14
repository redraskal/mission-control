import { Route, html } from "gateway";

export default class implements Route {
	head() {
		return html`
			<title>Mission Control</title>
			<link rel="stylesheet" href="/css/style.css" />
		`;
	}

	body() {
		return html`
			<h1>Page not found</h1>
			<p>Sorry, we can't find that page.</p>
			<a href="/">
				<button>Back to Home</button>
			</a>
		`;
	}
}
