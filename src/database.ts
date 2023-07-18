import Database from "bun:sqlite";

const database = new Database("control.sql");
export default database;
