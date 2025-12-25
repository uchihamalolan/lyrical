import { Link } from "@tanstack/react-router";

export function NotFound() {
	return (
		<div className="hero min-h-[70vh] bg-base-100">
			<div className="hero-content text-center">
				<div className="max-w-md">
					<h1 className="text-9xl font-bold text-primary">404</h1>
					<h2 className="text-3xl font-bold mt-4">Page Not Found</h2>
					<p className="py-6 text-base-content/70">
						Sorry, we couldn't find the page you're looking for. It might have
						been moved or doesn't exist.
					</p>
					<Link to="/" className="btn btn-primary">
						Go Home
					</Link>
				</div>
			</div>
		</div>
	);
}
