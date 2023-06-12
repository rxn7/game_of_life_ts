import { Graphics } from "./graphics.js"
import { State } from "./state.js";

export class Grid {
	public cells: Array<boolean> = new Array<boolean>()
	private cellSize: number = 10.0;
	private stepThreadTimeout?: number
	private readonly spacing: number = 0.1;

	public constructor(private readonly size: number, public stepInterval: number = 1000) {
		this.cells = new Array<boolean>(this.size * this.size)
		this.setStepInterval(stepInterval)
	}

	public setCells(cells: Array<boolean>): void {
		if (cells.length != this.cells.length)
			throw new Error('Cannot set cells array with different length than the grid\'s original cells array')

		this.cells = cells
	}

	public randomize(): void {
		for (let i = 0; i < this.size * this.size; i++)
			this.cells[i] = Math.random() > 0.8
	}

	public async step(): Promise<void> {
		type CellChange = {
			idx: number,
			value: boolean
		}

		let changes: Array<CellChange> = []

		for (let i = 0; i < this.cells.length; ++i) {
			const neighbourCount: number = this.countNeighbours(i)
			const cell: boolean = this.cells[i]

			if (cell) {
				if (neighbourCount < 2 || neighbourCount > 3)
					changes.push({ idx: i, value: false })
			} else if (neighbourCount == 3) {
				changes.push({ idx: i, value: true })
			}
		}

		for (const change of changes)
			this.cells[change.idx] = change.value
	}

	public render(): void {
		const positionScale: number = this.cellSize + this.cellSize * this.spacing
		Graphics.ctx.beginPath()
		Graphics.ctx.fillStyle = '#fff'
		for (let i = 0; i < this.cells.length; ++i) {
			if (this.cells[i]) {
				const [x, y] = this.cellIdxToPosition(i)
				Graphics.ctx.rect(x * positionScale, y * positionScale, this.cellSize, this.cellSize)
			}
		}
		Graphics.ctx.fill()
	}

	private countNeighbours(cellIdx: number): number {
		const [x, y] = this.cellIdxToPosition(cellIdx)

		let neighbourCount: number = 0

		for (let xoffset = -1; xoffset < 2; ++xoffset) {
			for (let yoffset = -1; yoffset < 2; ++yoffset) {
				if (xoffset == 0 && yoffset == 0)
					continue

				const neighbourX: number = x + xoffset
				const neighbourY: number = y + yoffset

				if (neighbourX < 0 || neighbourX >= this.size || neighbourY < 0 || neighbourY >= this.size)
					continue

				const neighbourIdx: number = this.cellPositionToIdx(neighbourX, neighbourY)

				if (this.cells[neighbourIdx]) neighbourCount++
			}
		}

		return neighbourCount
	}

	public cellIdxToPosition = (cellIdx: number): [number, number] => [Math.floor(cellIdx % this.size), Math.floor(cellIdx / this.size)]
	public cellPositionToIdx = (x: number, y: number): number => Math.floor(y * this.size + x)

	public setStepInterval(interval: number): void {
		const stepThread = async () => {
			this.stepThreadTimeout = setTimeout(stepThread, this.stepInterval)

			if (!State.paused)
				await this.step()
		}

		clearTimeout(this.stepThreadTimeout)
		this.stepInterval = interval
		this.stepThreadTimeout = setTimeout(stepThread, this.stepInterval)
	}

	public updateSize(): void {
		this.cellSize = Math.min(Graphics.canvas.height, Graphics.canvas.width) / (this.size + this.size * this.spacing);
	}
}
