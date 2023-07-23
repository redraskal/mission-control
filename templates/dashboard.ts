import { html, HTMLTemplateString } from "gateway";
import { gitCommitHash } from "../src/git";

type NavLink = {
	href: string;
	label: string;
	current: boolean;
};

function navLink(link: NavLink) {
	return html`
		<a href="${link.href}" ${link.current ? `aria-current="page"` : ""}>
			<button>${link.label}</button>
		</a>
	`;
}

const pages = [
	{
		href: "/containers",
		label: "Containers",
	},
	{
		href: "/services",
		label: "Services",
	},
	{
		href: "/firewall",
		label: "Firewall",
	},
	{
		href: "/logs",
		label: "Logs",
	},
	{
		href: "/admin",
		label: "Admin",
	},
] as NavLink[];

export default function (path: string, body: HTMLTemplateString) {
	return html`
		<main>
			<h1>MISSION_CONTROL</h1>
			<hr />
			<nav>${pages.map((page) => navLink({ ...page, current: page.href == path }))}</nav>
			<hr />
			<h2>${pages.find((page) => page.href == path)?.label || path}</h2>
			<hr />
			${body}
			<footer>version: ${gitCommitHash}</footer>
		</main>
	`;
}
