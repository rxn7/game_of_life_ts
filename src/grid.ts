import { Graphics } from "./graphics.js"

export class Grid {
	private cells: Array<boolean> = new Array<boolean>()
	private readonly spacing: number = 0.1;
	private cellSize: number = 10.0;

	public constructor(private readonly size: number) {
		this.cells = new Array<boolean>(this.size * this.size)
		this.resize()
		this.randomize()
	}

	public randomize(): void {
		for (let i = 0; i < this.size * this.size; i++)
			this.cells[i] = Math.random() > 0.8
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

	public resize(): void {
		this.cellSize = Math.min(Graphics.canvas.height, Graphics.canvas.width) / this.size;
	}
}
