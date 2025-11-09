import { useNavigate } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useState } from "react";

export function Navbar() {
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
		<div className="navbar bg-base-100 shadow-sm">
			<div className="navbar-start">
				<a href="/" className="btn btn-ghost text-xl">
					Lyrical
				</a>
			</div>
			<div className="navbar-center">
				<form onSubmit={handleSubmit} className="flex items-center gap-2">
					<input
						type="text"
						placeholder="Search"
						className="input input-bordered w-48 md:w-64 rounded-full focus:outline-none focus:border-primary focus:ring focus:ring-primary"
						value={query}
						onChange={(e) => setQuery(e.target.value)}
					/>
					<button type="submit" className="btn btn-circle">
						<Search className="w-4 h-4" />
					</button>
				</form>
			</div>
			<div className="navbar-end"></div>
		</div>
	);
}
