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
				<section>
					<h3>Test project</h3>
					<table>
						<thead>
							<tr>
								<th>Image</th>
								<th>Container</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>
									<a href="/">
										<span style="color: var(--green)">● </span>
										dxflrs/amd64_garage:v0.8.1
									</a>
								</td>
								<td>
									<a href="/"> garage </a>
								</td>
							</tr>
						</tbody>
					</table>
				</section>
				<footer>dff4728de647d5b573f2e220fdacd1b8485e0e68</footer>
			</main>
		`;
	}
}
