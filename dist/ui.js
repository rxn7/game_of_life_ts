import { Main } from "./main.js";
import { State } from "./state.js";
export var UI;
(function (UI) {
    UI.containerHeight = 100;
    const container = document.getElementById('ui-container');
    function init() {
        container.style.height = `${UI.containerHeight}px`;
        const pauseButton = document.getElementById('pause-btn');
        pauseButton.addEventListener('click', () => {
            State.paused = !State.paused;
            pauseButton.textContent = State.paused ? "Unpause" : "Pause";
        });
        const stepsInput = document.getElementById('steps-per-second-input');
        stepsInput.valueAsNumber = 1.0 / Main.grid.stepInterval * 1000;
        stepsInput.addEventListener('change', () => Main.grid.setStepInterval(1.0 / stepsInput.valueAsNumber * 1000));
        document.getElementById('randomize-btn')?.addEventListener('click', () => Main.grid.randomize());
        document.getElementById('clear-btn')?.addEventListener('click', () => Main.grid.clear());
    }
    UI.init = init;
})(UI || (UI = {}));
