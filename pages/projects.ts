import { Data, Route, html } from "gateway";
import dashboard from "../templates/dashboard";

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
		return dashboard(
			"/projects",
			html`
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
									<a href="/">garage</a>
								</td>
							</tr>
						</tbody>
					</table>
				</section>
			`
		);
	}
}
