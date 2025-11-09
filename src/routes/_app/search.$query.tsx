import { createFileRoute } from "@tanstack/react-router";
import type { SongDetails } from "../../services/lrclib";
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
		<div className="container mx-auto p-4">
			<h1 className="text-2xl font-bold mb-4">Search Results for: "{query}"</h1>

			<div className="flex items-center gap-2 mb-4">
				<span className="loading loading-spinner loading-sm"></span>
				<p className="text-sm text-gray-500">Searching...</p>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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

function Duration({ duration }: { duration: number }) {
	return (
		<>
			{`${Math.floor(duration / 60)}:${String(duration % 60).padStart(2, "0")}`}
		</>
	);
}

function SongCard({ song }: { song: SongDetails }) {
	const handleClick = () => {
		// TODO: Add navigation or action for the song
		console.log("Song clicked:", song);
	};

	return (
		<button
			type="button"
			onClick={handleClick}
			className="card bg-base-200 shadow-md p-4 hover:bg-base-300 transition flex flex-col justify-between h-full text-left w-full focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
			aria-label={`${song.trackName} by ${song.artistName} from ${song.albumName}`}
		>
			<div>
				<h3 className="card-title">{song.trackName}</h3>
				<p className="text-sm text-gray-500">{song.albumName}</p>
				<p className="card-subtitle">{song.artistName}</p>
			</div>
			<div className="flex justify-end mt-2 card-actions">
				<span className="badge badge-soft">
					<Duration duration={song.duration} />
				</span>
			</div>
		</button>
	);
}

function RouteComponent() {
	const results = Route.useLoaderData();
	const { query } = Route.useParams();

	return (
		<div className="container mx-auto p-4">
			<h1 className="text-2xl font-bold mb-4">Search Results for: "{query}"</h1>

			<p className="text-sm text-gray-500 mb-4">
				Found {results.length} result{results.length !== 1 ? "s" : ""}
			</p>

			{results.length === 0 ? (
				<p className="text-gray-500">No results found</p>
			) : (
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
					{results.map((song) => (
						<SongCard key={song.id} song={song} />
					))}
				</div>
			)}
		</div>
	);
}
