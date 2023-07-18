import { socketPath } from "bun-docker";
import Migrations from "bun-migrate";
import database from "./database";
import "./git";

await Migrations.run(database);

if (!(await socketPath())) {
	console.error("⚠️ Docker unix socket not found.");
}
