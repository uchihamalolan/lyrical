import { Link, useLocation } from "@tanstack/react-router";
import { SearchSongs } from "./SearchSongs";

export function Navbar() {
	const location = useLocation();
	const isAdvancedSearchPage = location.pathname === "/search";

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
				{!isAdvancedSearchPage && (
					<Link
						to="/search"
						className="btn btn-outline btn-sm order-2 md:order-none ml-auto md:ml-0 md:justify-self-end"
					>
						Advanced Search
					</Link>
				)}
			</div>
		</div>
	);
}
