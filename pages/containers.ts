import { Data, Route, html, RouteWebSocket } from "gateway";
import { ensureSignedIn, getAccount } from "../middleware/auth";
import { asCSSColor } from "../src/containers";
import docker from "../src/docker";
import dashboard from "../templates/dashboard";

export default class implements Route {
	@ensureSignedIn()
	async data() {
		const { data, error } = await docker.get("/containers/json", {
			params: {
				query: {
					all: true,
				},
			},
		});
		if (error) throw error;
		return {
			containers: data,
		};
	}

	ws(): RouteWebSocket {
		return {
			open(ws) {
				const account = getAccount(ws.data.headers);
				if (!account) return ws.close();
				// TODO
			},
		};
	}

	head() {
		return html`
			<title>Containers - MISSION_CONTROL</title>
			<link rel="stylesheet" href="/css/style.css" />
			<link rel="stylesheet" href="/css/pages/containers.css" />
		`;
	}

	body(data: Data<this>, err?: Error) {
		return dashboard(
			"/containers",
			html`
				<section>
					<h3>Test</h3>
					<table>
						<thead>
							<tr>
								<th>Image</th>
								<th>Container</th>
							</tr>
						</thead>
						<tbody>
							${data.containers.map(
								(container) => html`
									<tr>
										<td>
											<a href="/containers/${container.Id}">
												<span style="color: ${asCSSColor(container.State)}">● </span>
												${container.Image}
											</a>
										</td>
										<td>
											<a href="/containers/${container.Id}">${container.Names?.at(0)}</a>
										</td>
									</tr>
								`
							)}
						</tbody>
					</table>
				</section>
			`
		);
	}
}
