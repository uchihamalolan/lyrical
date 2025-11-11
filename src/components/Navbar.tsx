import { Link, useLocation } from "@tanstack/react-router";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { SearchSongs } from "./SearchSongs";

export function Navbar() {
	const location = useLocation();
	const isAdvancedSearchPage = location.pathname === "/search";
	const [theme, setTheme] = useState<"light" | "dark">("light");

	useEffect(() => {
		const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
		const prefersDark = window.matchMedia(
			"(prefers-color-scheme: dark)",
		).matches;
		const initialTheme = savedTheme || (prefersDark ? "dark" : "light");
		setTheme(initialTheme);
		document.documentElement.setAttribute("data-theme", initialTheme);
	}, []);

	const toggleTheme = () => {
		const newTheme = theme === "light" ? "dark" : "light";
		setTheme(newTheme);
		localStorage.setItem("theme", newTheme);
		document.documentElement.setAttribute("data-theme", newTheme);
	};

	return (
		<div className="bg-base-100 shadow-sm">
			<div className="container mx-auto px-4 py-4 flex flex-wrap md:grid md:grid-cols-[auto_1fr_auto] items-center gap-4">
				<Link
					to="/"
					className="btn btn-ghost text-xl px-2 order-1 md:order-none md:justify-self-start"
				>
					Lyrical
				</Link>
				{!isAdvancedSearchPage && (
					<div className="order-3 md:order-none w-full md:w-auto md:max-w-2xl md:mx-auto md:justify-self-center">
						<SearchSongs />
					</div>
				)}
				<div className="order-2 md:order-none ml-auto md:ml-0 md:justify-self-end flex gap-2">
					<button
						type="button"
						onClick={toggleTheme}
						className="btn btn-ghost btn-circle btn-sm"
						aria-label="Toggle theme"
					>
						{theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
					</button>
					{/* {!isAdvancedSearchPage && (
						<Link to="/search" className="btn btn-outline btn-sm">
							Advanced Search
						</Link>
					)} */}
				</div>
			</div>
		</div>
	);
}
