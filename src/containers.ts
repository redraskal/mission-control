export function asCSSColor(state?: string) {
	switch (state) {
		case "running":
			return "var(--green)";
		case "restarting":
			return "var(--primary)";
		case "stopped" || "ended":
			return "var(--red)";
		default:
			return "var(--accents-5)";
	}
}
