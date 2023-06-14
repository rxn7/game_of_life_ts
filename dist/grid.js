import { Graphics } from "./graphics.js";
import { State } from "./state.js";
export class Grid {
    constructor(size, stepInterval = 1000) {
        this.size = size;
        this.stepInterval = stepInterval;
        this.cells = new Array();
        this.cellSize = 10.0;
        this.hoveredCellIdx = -1;
        this.lastHoveredCellIdx = -1;
        this.spacing = 0.1;
        this.cellIdxToPosition = (cellIdx) => [Math.floor(cellIdx % this.size), Math.floor(cellIdx / this.size)];
        this.cellPositionToIdx = (x, y) => Math.floor(y * this.size + x);
        this.cells = new Array(this.size * this.size);
        this.setStepInterval(stepInterval);
        Graphics.canvas.addEventListener('mousemove', (ev) => {
            const rect = Graphics.getRect();
            const cellX = Math.floor((ev.pageX - rect.left) / rect.width * this.size);
            const cellY = Math.floor((ev.pageY - rect.top) / rect.height * this.size);
            this.lastHoveredCellIdx = this.hoveredCellIdx;
            this.hoveredCellIdx = this.cellPositionToIdx(cellX, cellY);
            switch (ev.buttons) {
                case 1:
                    this.updateCellUnderMouse(ev, true);
                    break;
                case 2:
                    this.updateCellUnderMouse(ev, false);
                    break;
            }
        });
        Graphics.canvas.addEventListener('mousedown', (ev) => {
            switch (ev.button) {
                case 0:
                    this.updateCellUnderMouse(ev, true);
                    break;
                case 2:
                    this.updateCellUnderMouse(ev, false);
                    break;
            }
        });
    }
    updateCellUnderMouse(ev, value) {
        if (this.hoveredCellIdx === -1)
            return;
        this.cells[this.hoveredCellIdx] = value;
    }
    setCells(cells) {
        if (cells.length != this.cells.length)
            throw new Error('Cannot set cells array with different length than the grid\'s original cells array');
        this.cells = cells;
    }
    clear() {
        this.cells = [];
    }
    randomize() {
        for (let i = 0; i < this.size * this.size; i++)
            this.cells[i] = Math.random() > 0.8;
    }
    async step() {
        let newCells = this.cells.slice(0);
        for (let i = 0; i < this.cells.length; ++i) {
            const neighbourCount = this.countNeighbours(i);
            const cell = this.cells[i];
            if (cell) {
                if (neighbourCount < 2 || neighbourCount > 3)
                    newCells[i] = false;
            }
            else if (neighbourCount == 3) {
                newCells[i] = true;
            }
        }
        this.cells = newCells;
    }
    render() {
        const positionScale = this.cellSize + this.cellSize * this.spacing;
        if (this.hoveredCellIdx !== -1) {
            const [x, y] = this.cellIdxToPosition(this.hoveredCellIdx);
            Graphics.ctx.fillStyle = '#282828';
            Graphics.ctx.fillRect(x * positionScale, y * positionScale, this.cellSize, this.cellSize);
        }
        Graphics.ctx.beginPath();
        Graphics.ctx.fillStyle = '#000';
        for (let i = 0; i < this.cells.length; ++i) {
            if (this.cells[i]) {
                const [x, y] = this.cellIdxToPosition(i);
                Graphics.ctx.roundRect(x * positionScale, y * positionScale, this.cellSize, this.cellSize, this.cellSize * 0.25);
            }
        }
        Graphics.ctx.fill();
    }
    countNeighbours(cellIdx) {
        const [x, y] = this.cellIdxToPosition(cellIdx);
        let neighbourCount = 0;
        for (let xoffset = -1; xoffset < 2; ++xoffset) {
            for (let yoffset = -1; yoffset < 2; ++yoffset) {
                if (xoffset == 0 && yoffset == 0)
                    continue;
                const neighbourX = x + xoffset;
                const neighbourY = y + yoffset;
                if (neighbourX < 0 || neighbourX >= this.size || neighbourY < 0 || neighbourY >= this.size)
                    continue;
                const neighbourIdx = this.cellPositionToIdx(neighbourX, neighbourY);
                if (this.cells[neighbourIdx])
                    neighbourCount++;
            }
        }
        return neighbourCount;
    }
    setStepInterval(interval) {
        const stepThread = async () => {
            this.stepThreadTimeout = setTimeout(stepThread, this.stepInterval);
            if (!State.paused)
                await this.step();
        };
        clearTimeout(this.stepThreadTimeout);
        this.stepInterval = interval;
        this.stepThreadTimeout = setTimeout(stepThread, this.stepInterval);
    }
    updateSize() {
        this.cellSize = Math.min(Graphics.canvas.height, Graphics.canvas.width) / (this.size + this.size * this.spacing);
    }
}
