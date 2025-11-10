import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import type { SongDetails } from "../services/lrclib";
import { Duration } from "./Duration";

export function SongCard({ song }: { song: SongDetails }) {
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const handleClick = () => {
		queryClient.setQueryData(["songs", song.id], song);
		navigate({ to: "/songs/$songId", params: { songId: song.id.toString() } });
	};

	return (
		<button
			type="button"
			onClick={handleClick}
			className="card bg-base-200 shadow-md p-3 sm:p-4 hover:bg-base-300 transition flex flex-col justify-between h-full text-left w-full focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
			aria-label={`${song.trackName} by ${song.artistName} from ${song.albumName}`}
		>
			<div>
				<h3 className="card-title text-base sm:text-lg line-clamp-2">{song.trackName}</h3>
				<p className="text-xs sm:text-sm text-gray-500 truncate">{song.albumName}</p>
				<p className="card-subtitle text-sm sm:text-base truncate">{song.artistName}</p>
			</div>
			<div className="flex mt-2 card-actions flex-wrap gap-1">
				{song.syncedLyrics ? (
					<span className="badge badge-primary badge-soft text-xs">Synced</span>
				) : (
					<span className="badge badge-neutral badge-soft text-xs">Plain</span>
				)}
				<span className="badge badge-soft ms-auto text-xs">
					<Duration duration={song.duration} />
				</span>
			</div>
		</button>
	);
}
