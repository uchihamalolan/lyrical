import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";

import { Duration } from "../../../components/Duration";
import { getSongQuery } from "../../../queries/lrclib";
import type { SongDetails } from "../../../services/lrclib";
import { isMostlyLatin } from "../../../services/transliteration";
import { transliterateLyrics } from "../../../utils/transliteration";

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

function Error({ children }: { children: React.ReactNode }) {
	return (
		<span className="alert alert-error py-1.5 px-3 rounded-xl text-xs shadow-lg font-medium animate-in fade-in slide-in-from-top-2 duration-300">
			{children}
		</span>
	);
}

function TransliterateButton({ 
	onClick, 
	isTransliterated, 
	isLoading 
}: { 
	onClick: () => void; 
	isTransliterated: boolean; 
	isLoading: boolean; 
}) {
	return (
		<button
			type="button"
			onClick={onClick}
			className={`btn btn-soft rounded-full px-6 gap-2 transition-transform active:scale-95 font-bold ${
				isTransliterated ? "btn-neutral" : "btn-primary"
			} ${isLoading ? "loading opacity-70" : ""}`}
			disabled={isLoading}
		>
			{isLoading ? "..." : isTransliterated ? "Show Original" : "Show English"}
		</button>
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

function Lyrics({ lyrics }: { lyrics: string }) {
	const [isTransliterated, setIsTransliterated] = useState(false);
	const [transliteratedText, setTransliteratedText] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const showTransliterate = !isMostlyLatin(lyrics);

	const getTransliteratedLyrics = useServerFn(transliterateLyrics);

	const toggleTransliteration = async () => {
		if (isTransliterated) {
			setIsTransliterated(false);
			return;
		}

		if (transliteratedText) {
			setIsTransliterated(true);
			return;
		}

		setIsLoading(true);
		setError(null);
		try {
			const result = await getTransliteratedLyrics({ data: { lyrics }});
			setTransliteratedText(result);
			setIsTransliterated(true);
		} catch (err) {
			console.error("Transliteration failed:", err);
			setError("Failed to transliterate lyrics. Please try again.");
		} finally {
			setIsLoading(false);
		}
	};

	const displayText = isTransliterated && transliteratedText ? transliteratedText : lyrics;
	const lines = displayText.split("\n");

	return (
		<div className="bg-base-200/40 backdrop-blur-xl rounded-3xl p-8 sm:p-12 md:p-16 shadow-2xl border border-base-content/5 relative overflow-hidden before:absolute before:top-0 before:left-0 before:w-full before:h-1 before:bg-gradient-to-r before:from-transparent before:via-primary/20 before:to-transparent">
			<div className="absolute top-6 right-6 z-20 flex flex-col items-end gap-2">
				{showTransliterate && (
					<TransliterateButton 
						onClick={toggleTransliteration}
						isTransliterated={isTransliterated}
						isLoading={isLoading}
					/>
				)}
				
				{error && <Error>{error}</Error>}
			</div>

			<article className={`font-sans tracking-tight transition-all duration-700 ${isLoading ? "opacity-20 blur-md scale-[0.98]" : "opacity-100 scale-100"}`}>
				{lines.map((line, index) => (
					<p
						key={`${index}-${line.substring(0, 20)}`}
						className={line.trim() === "" ? "h-12" : "text-base-content text-xl sm:text-2xl md:text-3xl leading-relaxed font-normal hover:text-primary transition-colors duration-200"}
					>
						{line.trim() === "" ? "\u00A0" : line}
					</p>
				))}
			</article>
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
