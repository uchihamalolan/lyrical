import { createFileRoute } from "@tanstack/react-router";
import { SongCard } from "../../components/SongCard";
import { searchSongs } from "../../utils/lrclib";

export const Route = createFileRoute("/_app/search/$query")({
	loader: async ({ params }) => searchSongs({ data: { query: params.query } }),
	component: RouteComponent,
	pendingComponent: LoadingComponent,
});

function LoadingComponent() {
	const { query } = Route.useParams();
	const skeletonItems = [
		{ id: "skeleton-1" },
		{ id: "skeleton-2" },
		{ id: "skeleton-3" },
	];

	return (
		<div className="container mx-auto px-4 py-4 sm:py-6">
			<h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 break-words">Search Results for: "{query}"</h1>

			<div className="flex items-center gap-2 mb-4">
				<span className="loading loading-spinner loading-sm"></span>
				<p className="text-sm text-gray-500">Searching...</p>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
				{skeletonItems.map((item) => (
					<div key={item.id} className="card bg-base-200 p-4">
						<div className="h-6 bg-base-300 rounded w-3/4 mb-2"></div>
						<div className="h-4 bg-base-300 rounded w-1/2 mb-2"></div>
						<div className="h-3 bg-base-300 rounded w-1/4"></div>
					</div>
				))}
			</div>
		</div>
	);
}

function RouteComponent() {
	const results = Route.useLoaderData();
	const { query } = Route.useParams();

	return (
		<div className="container mx-auto px-4 py-4 sm:py-6">
			<h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 break-words">Search Results for: "{query}"</h1>

			<p className="text-sm text-gray-500 mb-4">
				Found {results.length} result{results.length !== 1 ? "s" : ""}
			</p>

			{results.length === 0 ? (
				<p className="text-gray-500">No results found</p>
			) : (
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
					{results.map((song) => (
						<SongCard key={song.id} song={song} />
					))}
				</div>
			)}
		</div>
	);
}
