import { Route, RouteWebSocket, Data, html, zod } from "gateway";
import dashboard from "../../templates/dashboard";
import { ensureSignedIn, getAccount } from "../../middleware/auth";
import { isDockerNameFormat, waitForImage } from "../../src/utils";
import docker from "../../src/docker";
import { z } from "zod";

const newContainerSchema = z.object({
	image: z.string().nonempty().max(4096),
	name: z.string().nonempty().max(128),
});

const pullCreds = btoa(
	JSON.stringify({
		serveraddress: "https://index.docker.io/v2/",
	})
);

export default class implements Route {
	@ensureSignedIn()
	async data(req: Request) {
		const createOptions = await zod(req, newContainerSchema);
		if (!createOptions) return;
		if (createOptions.image.indexOf(":") == -1) {
			createOptions.image = createOptions.image + ":latest";
		}
		const createImage = await docker.post("/images/create", {
			params: {
				query: {
					fromImage: createOptions.image,
				},
				header: {
					"X-Registry-Auth": pullCreds,
				},
			},
			body: "",
		});
		if (createImage.error) throw createImage.error;
		await waitForImage(createOptions.image);
		const { data, error } = await docker.post("/containers/create", {
			params: {
				query: {
					name: createOptions.name,
				},
			},
			body: {
				Image: createOptions.image,
			},
		});
		if (error) throw error;
		return data;
	}

	head() {
		return html`
			<title>New Container - MISSION_CONTROL</title>
			<link rel="stylesheet" href="/css/style.css" />
			<link rel="stylesheet" href="/css/templates/dashboard.css" />
		`;
	}

	ws(): RouteWebSocket {
		return {
			open(ws) {
				const account = getAccount(ws.data.headers);
				if (!account) return ws.close();
			},
			async message(ws, message) {
				if (message instanceof Uint8Array || message.length > 4096 || !isDockerNameFormat(message)) return;
				const localSearch = await docker.get("/images/json", {
					params: {
						query: {
							filters: JSON.stringify({
								reference: {
									[message]: true,
								},
							}),
						},
					},
				});
				if (localSearch.error) return;
				const imageSearch = await docker.get("/images/search", {
					params: {
						query: {
							term: message,
							limit: 10,
						},
					},
				});
				if (imageSearch.error) return;
				const images = [];
				for (const image of localSearch.data) {
					if (image.RepoTags.length > 0) {
						images.push(image.RepoTags[0]);
					}
				}
				for (const image of imageSearch.data) {
					images.push(image.name);
				}
				ws.send(JSON.stringify(images));
			},
		};
	}

	body(data: Data<this>, err?: Error) {
		if (data?.Id) {
			return Response.redirect(`/containers/${data.Id}`);
		}
		// prettier-ignore
		return dashboard(
			"new container",
			html`
				<section>
					${err ? html` <p style="color: var(--primary)">Error! ${err?.message}</p> ` : ""}
					<form method="post">
						<label for="image">Image</label>
						<input type="text" id="image" name="image" list="suggestions" placeholder="dxflrs/garage:v0.8.2" autocorrect="off" autocapitalize="off" autofocus required />
						<datalist id="suggestions"></datalist>
						<label for="name">Container name</label>
						<input type="text" id="name" name="name" required />
						<input type="submit" value="Create" />
					</form>
				</section>
				<script src="/js/containers/new.js"></script>
			`
		);
	}
}
