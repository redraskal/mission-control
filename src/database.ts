import Database from "bun:sqlite";

const database = new Database("control.sqlite");
export default database;
