import {state} from "./utils/state.js";

const btnSound = document.querySelector('.btn_sound');

btnSound.addEventListener('click', e => {
    e.stopPropagation();
    state.sound = !state.sound;
    if(state.sound) btnSound.src = "./img/game_control/sound.png";
    else btnSound.src = "./img/game_control/no_sound.png";
});



