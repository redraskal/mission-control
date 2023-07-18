import { Route } from "gateway";

export default class implements Route {
	body() {
		return Response.redirect("/server/setup/welcome");
	}
}
