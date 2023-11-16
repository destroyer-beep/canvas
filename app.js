import {state} from "./utils/state.js";

const body = document.querySelector('#body');
const soundImg = document.getElementById('game__sound_img');
const canvas = document.getElementById('root');
const ctx = canvas.getContext('2d');

soundImg.addEventListener('click', () => {
    state.sound = !state.sound;
    if(state.sound) soundImg.src = './img/game_control/sound.png';
    else soundImg.src = './img/game_control/no_sound.png';
})

function init() {
    render()
    requestAnimationFrame(init);
}

function render() {
    ctx.font = "72px serif";
    ctx.fillStyle = "white";
    ctx.strokeStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText("ЛОВИ ИХ!", canvas.width/2, canvas.height/3.5);
    ctx.strokeText("ЛОВИ ИХ!", canvas.width/2, canvas.height/3.5);
}

init();

window.addEventListener('resize', () => {
    if(document.documentElement.clientWidth > 600) canvas.width = 600;
    else canvas.width = document.documentElement.clientWidth;

    canvas.height = document.documentElement.clientHeight;
})