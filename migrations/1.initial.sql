CREATE TABLE accounts (
	username TEXT NOT NULL UNIQUE,
	display_name TEXT NOT NULL,
	password TEXT NOT NULL,
	admin BOOLEAN NOT NULL DEFAULT 0
);

CREATE TABLE sessions (
	token TEXT NOT NULL PRIMARY KEY,
	account_id INTEGER NOT NULL REFERENCES accounts(rowid) ON DELETE CASCADE,
	created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
	expires_at DATETIME
) WITHOUT ROWID;

CREATE TABLE projects (
	name TEXT NOT NULL,
	owner_account_id INTEGER NOT NULL REFERENCES accounts(rowid) ON DELETE CASCADE,
	PRIMARY KEY (name, owner_account_id)
);
