import { MatchedRoute } from "bun";
import { Route } from "gateway";

export default class implements Route {
	data(_: Request, route: MatchedRoute) {
		throw new Error(`${route.params.slug} article not found`);
	}
};
