/**
 * LRC Lib API Service
 * Documentation: https://lrclib.net/docs
 */

const API_BASE_URL = "https://lrclib.net/api";

/**
 * Song details response from the LRC Lib API
 */
export interface SongDetails {
	id: number;
	name: string;
	trackName: string;
	artistName: string;
	albumName: string;
	duration: number;
	plainLyrics?: string;
	syncedLyrics?: string;
	instrumental: boolean;
}

/**
 * Search for songs using a query string
 * @param query - Search query (can be track name, artist name, or album name)
 * @returns Promise with search results
 */
export async function searchSongs(query: string): Promise<SongDetails[]> {
	const url = new URL(`${API_BASE_URL}/search`);
	url.searchParams.set("track_name", query.trim());

	const response = await fetch(url.toString(), {
		method: "GET",
		headers: {
			"User-Agent": "github.com/uchihamalolan/lyrical",
			"Content-Type": "application/json",
		},
	});

	if (!response.ok) {
		throw new Error(`HTTP ${response.status}: ${response.statusText}`);
	}

	return response.json();
}

/**
 * Get song details including lyrics by song ID
 * @param songId - The unique identifier of the song
 * @returns Promise with song details including lyrics
 */
export async function getSongDetails(songId: number): Promise<SongDetails> {
	const url = `${API_BASE_URL}/get/${songId}`;

	const response = await fetch(url, {
		method: "GET",
		headers: {
			"User-Agent": "github.com/uchihamalolan/lyrical",
			"Content-Type": "application/json",
		},
	});

	if (!response.ok) {
		throw new Error(`HTTP ${response.status}: ${response.statusText}`);
	}

	return response.json();
}
