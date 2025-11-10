import { SearchSongs } from "./SearchSongs";

export function Navbar() {
	return (
		<div className="bg-base-100 shadow-sm">
			<div className="container mx-auto px-4 py-4">
				<div className="flex flex-col md:flex-row md:items-center gap-4">
					<div className="flex items-center justify-between">
						<a href="/" className="btn btn-ghost text-xl px-2">
							Lyrical
						</a>
					</div>
					<div className="flex-1 md:max-w-2xl md:mx-auto">
						<SearchSongs />
					</div>
				</div>
			</div>
		</div>
	);
}
