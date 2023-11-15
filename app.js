import {state, steps} from "./utils/state.js";

const btnSound = document.querySelector('#btn__sound');
const btnStart = document.querySelector('#btn__start');

btnSound.addEventListener('click', e => {
    e.stopPropagation();
    state.sound = !state.sound;
    console.log(state)
    if(state.sound) btnSound.src = "./img/game_control/sound.png";
    else btnSound.src = "./img/game_control/no_sound.png";
});

btnStart.addEventListener('click', e => {
    e.stopPropagation();
    state.step = 'loading';
    renderInterface();
})

function renderInterface() {
    switch (state.step) {
        case 'loading':
            btnStart.classList.add('hide');
    }
}