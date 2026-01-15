import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { X } from "lucide-react";
import { useId, useRef, useState } from "react";

export const Route = createFileRoute("/_app/search/")({
	component: RouteComponent,
});

const MIN_CHARS = 2;

export function ClearableInput({
	label,
	value,
	onChange,
	placeholder,
}: {
	label: string;
	value: string;
	onChange: (value: string) => void;
	placeholder: string;
}) {
	const id = useId();
	const inputRef = useRef<HTMLInputElement>(null);

	const handleClear = () => {
		onChange("");
		inputRef.current?.focus();
	};

	return (
		<div>
			<label htmlFor={id} className="block text-sm font-medium mb-2">
				{label}
			</label>
			<div className="relative">
				<input
					id={id}
					ref={inputRef}
					type="text"
					value={value}
					onChange={(e) => onChange(e.target.value)}
					placeholder={placeholder}
					className="input input-bordered w-full pr-10"
				/>
				{value.length > 0 && (
					<button
						type="button"
						onClick={handleClear}
						className="absolute right-2 top-1/2 -translate-y-1/2 text-base-content/50 hover:text-base-content p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-primary z-10"
						aria-label={`Clear ${label}`}
					>
						<X size={16} />
					</button>
				)}
			</div>
		</div>
	);
}

export function RouteComponent() {
	const navigate = useNavigate();
	const [trackName, setTrackName] = useState("");
	const [artistName, setArtistName] = useState("");
	const [albumName, setAlbumName] = useState("");
	const [error, setError] = useState("");

	const validateForm = (): boolean => {
		const trackValid = trackName.trim().length >= MIN_CHARS;
		const artistValid = artistName.trim().length >= MIN_CHARS;
		const albumValid = albumName.trim().length >= MIN_CHARS;

		if (!trackValid && !artistValid && !albumValid) {
			setError(`At least one field must have ${MIN_CHARS} or more characters`);
			return false;
		}

		setError("");
		return true;
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		if (!validateForm()) {
			return;
		}

		// Combine the search terms into a single query
		// We include all non-empty strings, even if they are short,
		// as long as the global validation passed (at least one "good" term exists)
		const searchTerms = [trackName, artistName, albumName]
			.map((term) => term.trim())
			.filter((term) => term.length > 0)
			.join(" ");

		navigate({
			to: "/search/$query",
			params: { query: searchTerms },
		});
	};

	const handleInputChange = (
		setter: (value: string) => void,
		value: string,
	) => {
		setter(value);
		if (error) {
			// Clear error when user starts typing
			setError("");
		}
	};

	return (
		<div className="min-h-screen">
			<div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
				<div className="max-w-2xl mx-auto">
					<h1 className="text-3xl sm:text-4xl font-bold mb-2">
						Advanced Search
					</h1>
					<p className="text-base-content/70 mb-8">
						Search for songs by track name, artist, or album. At least one field
						must have {MIN_CHARS} or more characters.
					</p>

					<form onSubmit={handleSubmit} className="space-y-6">
						<ClearableInput
							label="Track Name"
							value={trackName}
							onChange={(val) => handleInputChange(setTrackName, val)}
							placeholder="Enter track name..."
						/>

						<ClearableInput
							label="Artist Name"
							value={artistName}
							onChange={(val) => handleInputChange(setArtistName, val)}
							placeholder="Enter artist name..."
						/>

						<ClearableInput
							label="Album Name"
							value={albumName}
							onChange={(val) => handleInputChange(setAlbumName, val)}
							placeholder="Enter album name..."
						/>

						{error && (
							<div
								className="alert alert-error"
								role="alert"
								aria-live="polite"
							>
								{error}
							</div>
						)}

						<button type="submit" className="btn btn-primary w-full">
							Search
						</button>
					</form>
				</div>
			</div>
		</div>
	);
}
