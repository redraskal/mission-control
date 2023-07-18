export const gitCommitHash = Bun.spawnSync({
	cmd: ["git", "rev-parse", "HEAD"],
	stdout: "pipe",
})
	.stdout.toString()
	.trim();
