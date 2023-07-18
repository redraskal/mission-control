import database from "./database";

const _select = database.query("SELECT * from sessions WHERE token = $token");
const _insert = database.query(
	"INSERT INTO sessions (token, account_id, expires_at) VALUES ($token, $account_id, $expires_at)"
);
const _delete = database.query("DELETE FROM sessions WHERE token = $token");
const _deleteByAccountID = database.query("DELETE FROM sessions WHERE account_id = $account_id");

export type Session = {
	token: string;
	account_id: number;
	created_at: number;
	expires_at?: number;
};

export default class sessions {
	static get(token: string) {
		return _select.get(token) as Session | null;
	}

	static insert(token: string, account_id: number, expires_at?: number) {
		return _insert.run(token, account_id, expires_at || null);
	}

	static invalidate(key: string) {
		return _delete.run(key);
	}

	static invalidateAll(account_id: number) {
		return _deleteByAccountID.run(account_id);
	}
}
