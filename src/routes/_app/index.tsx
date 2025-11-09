import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "../../components/Navbar";

export const Route = createFileRoute("/_app/")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="">
			<Navbar />
		</div>
	);
}
