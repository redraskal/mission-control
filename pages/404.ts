import { Route, html } from "gateway";

export default class implements Route {
	head() {
		return html`
			<title>404 - Mission Control</title>
			<link rel="stylesheet" href="/css/style.css" />
			<link rel="stylesheet" href="/css/pages/404.css" />
		`;
	}

	body() {
		return html`
			<main>
				<h1>Lost in space?</h1>
				<a href="/">
					<button>travel home</button>
				</a>
				<footer>
					photo by <a href="https://unsplash.com/@nasa" target="_blank">NASA</a>
					<span> on </span>
					<a href="https://unsplash.com/photos/8Hjx3GNZYeA" target="_blank">Unsplash</a>
				</footer>
			</main>
		`;
	}
}
