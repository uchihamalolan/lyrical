import { notFound } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import {
	getSongDetails as getSongDetailsService,
	type SongDetails,
	searchSongs as searchSongsService,
} from "../services/lrclib";

// Zod schemas for validation
const SearchQuerySchema = z.object({
	query: z.string().min(1, "Query must not be empty"),
});

const SongIdSchema = z.object({
	songId: z.number().positive("Song ID must be a positive number"),
});

/**
 * Server function to search for songs
 * @param query - Search query (can be track name, artist name, or album name)
 * @returns Promise with search results
 */
export const searchSongs = createServerFn({ method: "GET" })
	.inputValidator(SearchQuerySchema)
	.handler(async ({ data }): Promise<SongDetails[]> => {
		try {
			return await searchSongsService(data.query);
		} catch (error) {
			if (error instanceof Error) {
				throw new Error(`Failed to search songs: ${error.message}`);
			}
			throw new Error("Failed to search songs: Unknown error");
		}
	});

/**
 * Server function to get song details including lyrics
 * @param songId - The unique identifier of the song
 * @returns Promise with song details including lyrics
 */
export const getSongDetails = createServerFn({ method: "GET" })
	.inputValidator(SongIdSchema)
	.handler(async ({ data }): Promise<SongDetails> => {
		try {
			return await getSongDetailsService(data.songId);
		} catch (error) {
			if (error instanceof Error) {
				if (error.message.includes("404")) {
					throw notFound();
				}
				throw new Error(`Failed to fetch song details: ${error.message}`);
			}
			throw new Error("Failed to fetch song details: Unknown error");
		}
	});
