import { describe, it, expect, vi, beforeEach } from "vitest";
import { searchSongs, getSongDetails, type SongDetails } from "./lrclib";

// Mock the global fetch function
const fetchMock = vi.fn();
global.fetch = fetchMock;

describe("lrclib service", () => {
	beforeEach(() => {
		fetchMock.mockReset();
	});

	describe("searchSongs", () => {
		const mockResults: SongDetails[] = [
			{
				id: 1,
				name: "Test Song",
				trackName: "Test Song",
				artistName: "Test Artist",
				albumName: "Test Album",
				duration: 200,
				instrumental: false,
			},
		];

		it("should fetch songs successfully", async () => {
			fetchMock.mockResolvedValueOnce({
				ok: true,
				json: async () => mockResults,
			});

			const results = await searchSongs("Test");

			expect(fetchMock).toHaveBeenCalledTimes(1);
			expect(fetchMock).toHaveBeenCalledWith(
				expect.stringContaining("/api/search?q=Test"),
				expect.objectContaining({
					method: "GET",
				}),
			);
			expect(results).toEqual(mockResults);
		});

		it("should throw an error when API response is not ok", async () => {
			fetchMock.mockResolvedValueOnce({
				ok: false,
				status: 500,
				statusText: "Internal Server Error",
			});

			await expect(searchSongs("Error")).rejects.toThrow(
				"HTTP 500: Internal Server Error",
			);
		});
	});

	describe("getSongDetails", () => {
		const mockSong: SongDetails = {
			id: 123,
			name: "Specific Song",
			trackName: "Specific Song",
			artistName: "Artist",
			albumName: "Album",
			duration: 180,
			instrumental: false,
			plainLyrics: "La la la",
			syncedLyrics: "[00:10.00] La la la",
		};

		it("should fetch song details successfully", async () => {
			fetchMock.mockResolvedValueOnce({
				ok: true,
				json: async () => mockSong,
			});

			const result = await getSongDetails(123);

			expect(fetchMock).toHaveBeenCalledTimes(1);
			expect(fetchMock).toHaveBeenCalledWith(
				expect.stringContaining("/api/get/123"),
				expect.objectContaining({
					method: "GET",
				}),
			);
			expect(result).toEqual(mockSong);
		});

		it("should throw an error when song is not found", async () => {
			fetchMock.mockResolvedValueOnce({
				ok: false,
				status: 404,
				statusText: "Not Found",
			});

			await expect(getSongDetails(999)).rejects.toThrow("HTTP 404: Not Found");
		});
	});
});
