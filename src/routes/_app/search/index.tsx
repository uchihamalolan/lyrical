import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useId, useState } from "react";

export const Route = createFileRoute("/_app/search/")({
	component: RouteComponent,
});

function RouteComponent() {
	const navigate = useNavigate();
	const trackNameId = useId();
	const artistNameId = useId();
	const albumNameId = useId();
	const [trackName, setTrackName] = useState("");
	const [artistName, setArtistName] = useState("");
	const [albumName, setAlbumName] = useState("");
	const [error, setError] = useState("");

	const validateForm = (): boolean => {
		const trackValid = trackName.trim().length > 3;
		const artistValid = artistName.trim().length > 3;
		const albumValid = albumName.trim().length > 3;

		if (!trackValid && !artistValid && !albumValid) {
			setError("At least one field must have more than 3 characters");
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
		const searchTerms = [trackName, artistName, albumName]
			.filter((term) => term.trim().length > 3)
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
						must have more than 3 characters.
					</p>

					<form onSubmit={handleSubmit} className="space-y-6">
						<div>
							<label
								htmlFor={trackNameId}
								className="block text-sm font-medium mb-2"
							>
								Track Name
							</label>
							<input
								id={trackNameId}
								type="text"
								value={trackName}
								onChange={(e) =>
									handleInputChange(setTrackName, e.target.value)
								}
								placeholder="Enter track name..."
								className="input input-bordered w-full"
							/>
						</div>

						<div>
							<label
								htmlFor={artistNameId}
								className="block text-sm font-medium mb-2"
							>
								Artist Name
							</label>
							<input
								id={artistNameId}
								type="text"
								value={artistName}
								onChange={(e) =>
									handleInputChange(setArtistName, e.target.value)
								}
								placeholder="Enter artist name..."
								className="input input-bordered w-full"
							/>
						</div>

						<div>
							<label
								htmlFor={albumNameId}
								className="block text-sm font-medium mb-2"
							>
								Album Name
							</label>
							<input
								id={albumNameId}
								type="text"
								value={albumName}
								onChange={(e) =>
									handleInputChange(setAlbumName, e.target.value)
								}
								placeholder="Enter album name..."
								className="input input-bordered w-full"
							/>
						</div>

						{error && (
							<div className="alert alert-error">
								{error}
							</div>
						)}

						<button
							type="submit"
							className="btn btn-primary w-full"
						>
							Search
						</button>
					</form>
				</div>
			</div>
		</div>
	);
}
