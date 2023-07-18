import { Data, Route } from "gateway";
import { getUser } from "../middleware/auth";

export default class implements Route {
	async data(req: Request) {
		return {
			_signedIn: getUser(req),
		};
	}

	body(data: Data<this>) {
		return Response.redirect(data._signedIn ? "/projects" : "/login");
	}
}
