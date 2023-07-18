import database from "./database";

const _selectByID = database.query("SELECT *, rowid from accounts WHERE rowid = $id");
const _selectByUsername = database.query("SELECT *, rowid FROM accounts WHERE username = $username");
const _insert = database.query(
	"INSERT INTO accounts (username, display_name, password, admin) VALUES ($username, $display_name, $password, $admin)"
);

export type Account = {
	rowid: number;
	username: string;
	display_name: string;
	password: string;
	admin: boolean;
};

export default class accounts {
	static byID(id: number) {
		return _selectByID.get(id) as Account | null;
	}

	static byUsername(username: string) {
		return _selectByUsername.get(username) as Account | null;
	}

	static async insert(username: string, display_name: string, password: string, admin?: boolean) {
		const hashedPassword = await Bun.password.hash(password);
		return _insert.run(username, display_name, hashedPassword, admin ? admin : false);
	}
}
