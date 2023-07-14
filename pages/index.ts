import { Data, Route, html } from "gateway";

export default class implements Route {
	async data(req: Request) {
		const form = await Route.formData(req);
		return {
			time: new Date(Date.now()).toLocaleString(),
			name: form?.get("name") || "world",
			_secret: "yes",
		};
	}

	head(data: Data<this>) {
		return html`
			<title>Hello ${data.name}!</title>
			<link rel="stylesheet" href="/css/form.css" />
		`;
	}

	body(data: Data<this>) {
		return html`
			<h1>Hello ${data.name} at ${data.time}!</h1>
			<form method="post">
				<label for="name">Name</label>
				<input type="text" id="name" name="name" autofocus required>
				<input type="submit" value="Submit" />
			</form>
		`;
	}
};
