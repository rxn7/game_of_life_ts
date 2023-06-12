import { Main } from "./main.js"
import { State } from "./state.js"

export namespace UI {
	export const containerHeight: number = 100
	const container: HTMLDivElement = document.getElementById('ui-container') as HTMLDivElement
	const pauseButton: HTMLButtonElement = document.getElementById('pause-btn') as HTMLButtonElement
	const stepsPerSecondInput: HTMLInputElement = document.getElementById('steps-per-second-input') as HTMLInputElement

	export function init() {
		container.style.height = `${containerHeight}px`;

		Main.grid.setStepInterval(1.0 / stepsPerSecondInput.valueAsNumber * 1000)

		stepsPerSecondInput.addEventListener('change', () => {
			Main.grid.setStepInterval(1.0 / stepsPerSecondInput.valueAsNumber * 1000)
		})

		pauseButton.addEventListener('click', () => {
			State.paused = !State.paused
			pauseButton.textContent = State.paused ? "Unpause" : "Pause"
		})
	}
}
