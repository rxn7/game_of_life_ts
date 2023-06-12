import { UI } from "./ui.js"

export namespace Graphics {
	export const canvas: HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement
	export const canvasContainer: HTMLDivElement = document.getElementById('canvas-container') as HTMLDivElement
	export const ctx: CanvasRenderingContext2D = canvas.getContext('2d', { alpha: false, willReadFrequently: false }) as CanvasRenderingContext2D

	export function clear(): void {
		ctx.fillStyle = '#fff'
		ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight)
	}

	export function updateSize(): void {
		const size: number = Math.min(document.body.clientWidth, document.body.clientHeight - UI.containerHeight)
		canvasContainer.style.width = canvas.style.height = `${size}px`
		canvas.width = canvas.height = size
	}
}
