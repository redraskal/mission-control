import { Data, Route, html } from "gateway";

export default class implements Route {
	async data() {
		return {
			containers: [],
		};
	}

	head() {
		return html`
			<title>Home - Mission Control</title>
			<link rel="stylesheet" href="/css/style.css" />
			<link rel="stylesheet" href="/css/pages/projects.css" />
		`;
	}

	body(data: Data<this>, err?: Error) {
		return html`
			<main>
				<h1>MISSION_CONTROL</h1>
				<hr />
				<nav>
					<a href="/projects" aria-current="page">
						<button>Projects</button>
					</a>
					<a href="/volumes">
						<button>Volumes</button>
					</a>
					<a href="/firewall">
						<button>Firewall</button>
					</a>
					<a href="/logs">
						<button>Logs</button>
					</a>
					<a href="/admin">
						<button>Admin</button>
					</a>
				</nav>
				<hr />
				<h2>Projects</h2>
				<hr />
				<ul>
					<li>
						<h3>$Compose_</h3>
						<hr class="yellow" />
						<p>/mnt/user/compose</p>
						<button>Active - 6 services</button>
					</li>
				</ul>
				<footer>dff4728de647d5b573f2e220fdacd1b8485e0e68</footer>
			</main>
		`;
	}
}
