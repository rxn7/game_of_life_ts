export namespace Random {
	export const range = (min: number, max: number) => Math.random() * (max - min) + min
}
