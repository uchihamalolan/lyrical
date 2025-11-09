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
			className="card bg-base-200 shadow-md p-4 hover:bg-base-300 transition flex flex-col justify-between h-full text-left w-full focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
			aria-label={`${song.trackName} by ${song.artistName} from ${song.albumName}`}
		>
			<div>
				<h3 className="card-title">{song.trackName}</h3>
				<p className="text-sm text-gray-500">{song.albumName}</p>
				<p className="card-subtitle">{song.artistName}</p>
			</div>
			<div className="flex mt-2 card-actions">
				{song.syncedLyrics ? (
					<span className="badge badge-primary badge-soft">Synced</span>
				) : (
					<span className="badge badge-neutral badge-soft">Plain</span>
				)}
				<span className="badge badge-soft ms-auto">
					<Duration duration={song.duration} />
				</span>
			</div>
		</button>
	);
}
