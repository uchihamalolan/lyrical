import { Link, useRouter } from "@tanstack/react-router";

export function DefaultError({ error }: { error: Error }) {
	const router = useRouter();

	return (
		<div className="hero min-h-[70vh] bg-base-100">
			<div className="hero-content text-center">
				<div className="max-w-md">
					<h1 className="text-5xl font-bold text-error mb-4">Oops!</h1>
					<h2 className="text-2xl font-semibold mb-2">Something went wrong</h2>
					<p className="py-4 text-base-content/70">
						{error.message || "An unexpected error occurred."}
					</p>
					<div className="flex gap-4 justify-center">
						<button
							type="button"
							onClick={() => {
								router.invalidate();
							}}
							className="btn btn-outline"
						>
							Try Again
						</button>
						<Link to="/" className="btn btn-primary">
							Go Home
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
