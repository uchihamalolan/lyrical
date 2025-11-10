import { useNavigate } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useState } from "react";

export function SearchSongs() {
	const navigate = useNavigate();
	const [query, setQuery] = useState("");

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const trimmedQuery = query.trim();
		if (trimmedQuery) {
			navigate({
				to: "/search/$query",
				params: { query: trimmedQuery },
			});
		}
	};

	return (
		<form onSubmit={handleSubmit} className="flex items-center gap-2 w-full">
			<input
				type="text"
				placeholder="Search"
				className="input input-sm sm:input-md md:input-lg rounded-full input-bordered focus:outline-none focus:border-primary focus:ring focus:ring-primary flex-1 w-full"
				value={query}
				onChange={(e) => setQuery(e.target.value)}
			/>
			<button
				type="submit"
				className="btn btn-sm sm:btn-md md:btn-lg btn-circle flex-shrink-0"
			>
				<Search className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
			</button>
		</form>
	);
}
