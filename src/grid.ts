import { Graphics } from "./graphics.js"

export class Grid {
	public cells: Array<boolean> = new Array<boolean>()
	private cellSize: number = 10.0;
	private readonly spacing: number = 0.1;

	public constructor(private readonly size: number, stepInterval: number = 1000) {
		this.cells = new Array<boolean>(this.size * this.size)
		this.resize()

		const stepThread = async () => {
			setTimeout(stepThread, stepInterval)
			await this.step()
		}

		stepThread()
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
		for (let x = 0; x < this.size; ++x) {
			for (let y = 0; y < this.size; ++y) {
				if (this.cells[y * this.size + x]) {
					Graphics.ctx.fillStyle = '#fff'
					Graphics.ctx.fillRect(x * (this.cellSize + this.cellSize * this.spacing), y * (this.cellSize + this.cellSize * this.spacing), this.cellSize, this.cellSize)
				}
			}
		}
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

	public resize(): void {
		this.cellSize = Math.min(Graphics.canvas.height, Graphics.canvas.width) / this.size;
	}
}
