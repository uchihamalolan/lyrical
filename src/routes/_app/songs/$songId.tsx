import { createFileRoute } from "@tanstack/react-router";

import { Duration } from "@/components/Duration";
import { getSongQuery } from "@/queries/lrclib";
import type { SongDetails } from "@/services/lrclib";
import { Lyrics } from "@/components/SongLyrics";

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
			<span className="block text-6xl mb-4">📝</span>
			<p className="text-xl text-gray-400/60">
				Lyrics not available for this track
			</p>
		</div>
	);
}

function Instrumental() {
	return (
		<div className="text-center py-12">
			<span className="block text-6xl mb-4">🎵</span>
			<p className="text-xl text-gray-400/60">
				This is an instrumental track
			</p>
		</div>
	);
}

function SongHeader({ song }: { song: SongDetails }) {
	return (
		<div className="mb-8 md:mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 px-1">
			<div className="space-y-1">
				<h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter bg-gradient-to-br from-base-content to-base-content/60 bg-clip-text text-transparent font-display leading-[1.1]">
					{song.trackName}
				</h1>
				<div className="flex flex-wrap items-center gap-x-4 gap-y-1">
					<p className="text-lg sm:text-xl font-medium text-base-content/80 italic">
						{song.artistName}
					</p>
					<span className="text-base-content/20 hidden sm:inline">•</span>
					<p className="text-base sm:text-lg text-base-content/50">
						{song.albumName}
					</p>
				</div>
			</div>
			
			<div className="flex items-center gap-3 shrink-0">
				<span className="badge badge-md badge-ghost font-semibold border-base-content/10 py-3">
					<Duration duration={song.duration} />
				</span>
				<span className="badge badge-md badge-outline border-primary/20 text-primary/80 font-bold py-3">
					{song.plainLyrics ? "Synced" : "Transcribed"}
				</span>
				{song.instrumental && (
					<span className="badge badge-md badge-primary font-bold py-3">
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
		<div className="container mx-auto px-4 py-8 max-w-5xl">
			{/* Song Header */}
			<SongHeader song={song} />

			{/* Lyrics Section */}
			<div className="mt-2 sm:mt-4">
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
