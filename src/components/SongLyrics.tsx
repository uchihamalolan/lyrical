import { useServerFn } from "@tanstack/react-start";
import { useMemo, useState } from "react";

import { transliterateLyrics } from "@/utils/transliteration";
import { isMostlyLatin } from "@/services/transliteration";

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
                isTransliterated ? "" : "btn-primary"
            } ${isLoading ? "loading opacity-70" : ""}`}
            disabled={isLoading}
        >
            {isLoading ? "..." : isTransliterated ? "Show Original" : "Show English"}
        </button>
    );
}

export function Lyrics({ lyrics }: { lyrics: string }) {
	const [isTransliterated, setIsTransliterated] = useState(false);
	const [transliteratedText, setTransliteratedText] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const showTransliterate = useMemo(() => !isMostlyLatin(lyrics), [lyrics]);

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