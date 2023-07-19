import { Data, Route } from "gateway";
import { getAccount } from "../middleware/auth";

export default class implements Route {
	async data(req: Request) {
		return {
			_signedIn: getAccount(req),
		};
	}

	body(data: Data<this>) {
		return Response.redirect(data._signedIn ? "/containers" : "/login");
	}
}
