import { createFileRoute } from "@tanstack/react-router";
import { Duration } from "../../components/Duration";
import { getSongQuery } from "../../queries/lrclib";
import type { SongDetails } from "../../services/lrclib";

export const Route = createFileRoute("/_app/songs/$songId")({
	loader: ({ context, params }) => {
		return context.queryClient.ensureQueryData(
			getSongQuery(Number(params.songId)),
		);
	},
	component: RouteComponent,
});

function NotAvailable() {
	return (
		<div className="text-center py-12">
			<div className="text-6xl mb-4">📝</div>
			<p className="text-xl text-gray-500 dark:text-gray-400">
				Lyrics not available for this track
			</p>
		</div>
	);
}

function Instrumental() {
	return (
		<div className="text-center py-12">
			<div className="text-6xl mb-4">🎵</div>
			<p className="text-xl text-gray-500 dark:text-gray-400">
				This is an instrumental track
			</p>
		</div>
	);
}

function Lyrics({ lyrics }: { lyrics: string }) {
	return (
		<div className="bg-base-200 rounded-lg p-8 shadow-lg">
			<div className="prose prose-lg max-w-none">
				{lyrics.split("\n").map((line, index) => (
					<p
						key={`${index}-${line.substring(0, 20)}`}
						className={`${
							line.trim() === "" ? "h-4" : "text-base-content leading-relaxed"
						}`}
					>
						{line.trim() === "" ? "\u00A0" : line}
					</p>
				))}
			</div>
		</div>
	);
}

function SongHeader({ song }: { song: SongDetails }) {
	return (
		<div className="mb-8 text-center">
			<h1 className="text-4xl font-bold mb-2">{song.trackName}</h1>
			<p className="text-xl text-gray-600 dark:text-gray-400 mb-1">
				{song.artistName}
			</p>
			<p className="text-lg text-gray-500 dark:text-gray-500 mb-2">
				{song.albumName}
			</p>
			<div className="flex items-center justify-center gap-4 text-sm text-gray-500">
				<span className="badge badge-outline">
					<Duration duration={song.duration} />
				</span>
				{song.instrumental && (
					<span className="badge badge-primary">Instrumental</span>
				)}
			</div>
		</div>
	);
}

function RouteComponent() {
	const song = Route.useLoaderData();

	return (
		<div className="container mx-auto px-4 py-8 max-w-4xl">
			{/* Song Header */}
			<SongHeader song={song} />

			<div className="divider" />

			{/* Lyrics Section */}
			<div className="mt-8">
				{song.instrumental ? (
					<Instrumental />
				) : song.plainLyrics ? (
					<Lyrics lyrics={song.plainLyrics} />
				) : (
					<NotAvailable />
				)}
			</div>
		</div>
	);
}
