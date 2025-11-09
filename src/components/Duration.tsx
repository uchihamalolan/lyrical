export function Duration({ duration }: { duration: number }) {
	const minutes = Math.floor(duration / 60);
	const seconds = Math.floor(duration % 60);

	return <>{`${minutes}:${String(seconds).padStart(2, "0")}`}</>;
}
