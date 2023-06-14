import { Main } from "./main.js"
import { State } from "./state.js"

export namespace UI {
	export const containerHeight: number = 100
	const container: HTMLDivElement = document.getElementById('ui-container') as HTMLDivElement

	export function init() {
		container.style.height = `${containerHeight}px`;

		const pauseButton: HTMLButtonElement = document.getElementById('pause-btn') as HTMLButtonElement
		pauseButton.addEventListener('click', () => {
			State.paused = !State.paused
			pauseButton.textContent = State.paused ? "Unpause" : "Pause"
		})

		const stepsInput: HTMLInputElement = document.getElementById('steps-per-second-input') as HTMLInputElement
		stepsInput.valueAsNumber = 1.0 / Main.grid.stepInterval * 1000;

		stepsInput.addEventListener('change', () => Main.grid.setStepInterval(1.0 / stepsInput.valueAsNumber * 1000))
		document.getElementById('randomize-btn')?.addEventListener('click', () => Main.grid.randomize())
		document.getElementById('clear-btn')?.addEventListener('click', () => Main.grid.clear())
	}
}
