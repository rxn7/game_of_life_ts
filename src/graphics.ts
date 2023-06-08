export namespace Graphics {
	export const canvas: HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement
	export const ctx: CanvasRenderingContext2D = canvas.getContext('2d') as CanvasRenderingContext2D

	export function clear() {
		ctx.fillStyle = '#000'
		ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight)
	}
}
