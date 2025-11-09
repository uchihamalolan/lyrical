import { SearchSongs } from "./SearchSongs";

export function Navbar() {
	return (
		<div className="navbar bg-base-100 shadow-sm py-6">
			<div className="navbar-start">
				<a href="/" className="btn btn-ghost text-xl">
					Lyrical
				</a>
			</div>
			<div className="navbar-center">
				<SearchSongs />
			</div>
			<div className="navbar-end"></div>
		</div>
	);
}
