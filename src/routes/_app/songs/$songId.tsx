import { createFileRoute } from "@tanstack/react-router";
import { Duration } from "../../../components/Duration";
import { getSongQuery } from "../../../queries/lrclib";
import type { SongDetails } from "../../../services/lrclib";

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
		<div className="bg-base-200 rounded-lg p-4 sm:p-6 md:p-8 shadow-lg">
			<article className="font-serif tracking-wide ">
				{lyrics.split("\n").map((line, index) => (
					<p
						key={`${index}-${line.substring(0, 20)}`}
						className={`${
							line.trim() === ""
								? "h-8"
								: "text-base-content text-lg sm:text-xl leading-8 font-light"
						}`}
					>
						{line.trim() === "" ? "\u00A0" : line}
					</p>
				))}
			</article>
		</div>
	);
}

function SongHeader({ song }: { song: SongDetails }) {
	return (
		<div className="mb-6 sm:mb-8 text-center px-2">
			<h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 break-words">
				{song.trackName}
			</h1>
			<p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 mb-1 break-words">
				{song.artistName}
			</p>
			<p className="text-base sm:text-lg text-gray-500 dark:text-gray-500 mb-2 break-words">
				{song.albumName}
			</p>
			<div className="flex items-center justify-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-500 flex-wrap">
				<span className="badge badge-outline text-xs sm:text-sm">
					<Duration duration={song.duration} />
				</span>
				{song.instrumental && (
					<span className="badge badge-primary text-xs sm:text-sm">
						Instrumental
					</span>
				)}
			</div>
		</div>
	);
}

function RouteComponent() {
	const song = Route.useLoaderData();

	return (
		<div className="container mx-auto px-4 py-4 sm:py-6 md:py-8 max-w-4xl">
			{/* Song Header */}
			<SongHeader song={song} />

			<div className="divider" />

			{/* Lyrics Section */}
			<div className="mt-4 sm:mt-6 md:mt-8">
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
