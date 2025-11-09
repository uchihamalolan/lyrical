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
		<form onSubmit={handleSubmit} className="flex items-center gap-2">
			<input
				type="text"
				placeholder="Search"
				className="input input-xl rounded-full input-bordered focus:outline-none focus:border-primary focus:ring focus:ring-primary"
				value={query}
				onChange={(e) => setQuery(e.target.value)}
			/>
			<button type="submit" className="btn btn-xl btn-circle">
				<Search className="w-8 h-8" />
			</button>
		</form>
	);
}
