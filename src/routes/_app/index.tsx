import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="min-h-screen bg-white">
			<div className="border-gray-200">
				<div className="container mx-auto px-4 sm:px-6 py-16 sm:py-24 md:py-32 lg:py-20">
					<div className="max-w-4xl">
						<h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold tracking-tight text-black mb-6 sm:mb-8 leading-tight">
							Find lyrics
							<br />
							for every song
						</h1>
						<p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-8 sm:mb-12 max-w-2xl">
							Search millions of songs and discover the words that move you.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
