import { createServerFn } from "@tanstack/react-start";
import { notFound } from "@tanstack/react-router";
import { z } from "zod";
import { transliterate } from "../services/transliteration";

const TransliterateSchema = z.object({
  lyrics: z.string().min(1),
});

/**
 * Server function to get song details including lyrics
 * @param lyrics - The lyrics to be transliterated
 * @returns Promise with song details including lyrics
 */
export const transliterateLyrics = createServerFn({ method: "GET" })
    .inputValidator(TransliterateSchema)
    .handler(async ({ data }): Promise<string> => {
        try {
            return await transliterate(data.lyrics);
        } catch (error) {
            if (error instanceof Error) {
                if (error.message.includes("404")) {
                    throw notFound();
                }
                throw new Error(`Failed to transliterate lyrics: ${error.message}`);
            }
            throw new Error("Failed to transliterate lyrics: Unknown error");
        }
    });
