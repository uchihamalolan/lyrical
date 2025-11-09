import { queryOptions } from "@tanstack/react-query";
import { getSongDetails, searchSongs } from "../services/lrclib";

export const getSongQuery = (songId: number) =>
	queryOptions({
		queryKey: ["songs", songId],
		queryFn: () => getSongDetails(songId),
	});

export const searchSongsQuery = (query: string) =>
	queryOptions({
		queryKey: ["songs", "search", query],
		queryFn: () => searchSongs(query),
	});
