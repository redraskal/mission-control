import Migrations from "bun-migrate";
import database from "./database";
import "./git";

await Migrations.run(database);
