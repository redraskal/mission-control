import { sleep } from "bun";
import docker from "./docker";

export function isDockerNameFormat(s: string) {
	for (let i = 0; i < s.length; i++) {
		const charCode = s.charCodeAt(i);
		switch (true) {
			// -, ., _
			case charCode == 45 || charCode == 46 || charCode == 95:
				break;
			case charCode < 48:
				return false;
			case charCode > 57 && charCode < 65:
				return false;
			case charCode > 90 && charCode < 97:
				return false;
			case charCode > 122:
				return false;
		}
	}
	return true;
}

export async function waitForImage(name: string) {
	const maxTries = 120;
	let tries = 0;
	while (tries < maxTries) {
		const { error } = await docker.get("/images/{name}/json", {
			params: {
				path: {
					name,
				},
			},
		});
		if (!error) break;
		tries++;
		if (error && tries == maxTries) throw error;
		await sleep(500);
	}
}
