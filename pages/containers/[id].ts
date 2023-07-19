import { MatchedRoute } from "bun";
import { Data, Route, RouteError, html } from "gateway";
import { ensureSignedIn } from "../../middleware/auth";
import docker from "../../src/docker";
import dashboard from "../../templates/dashboard";

export default class implements Route {
	@ensureSignedIn()
	async data(req: Request, route: MatchedRoute) {
		const { data, error } = await docker.get("/containers/{id}/json", {
			params: {
				path: {
					id: route.query.id,
				},
				query: {},
			},
		});
		if (error) throw new RouteError(error.message, "/containers");
		return {
			container: data,
		};
	}

	head(data: Data<this>, err?: Error) {
		return html`
			<title>${data.container.Name || "Container"} - MISSION_CONTROL</title>
			<link rel="stylesheet" href="/css/style.css" />
			<link rel="stylesheet" href="/css/pages/containers.css" />
		`;
	}

	body(data: Data<this>, err?: Error) {
		return dashboard(
			data.container.Name || "Container",
			html` <section>${JSON.stringify(data.container, undefined, 4)}</section> `
		);
	}
}
