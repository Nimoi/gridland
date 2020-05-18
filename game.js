"use strict";
import {setupGrid, drawGrid} from './grid.js';
import {controls} from './controls.js';
let canvas;
let context;
let delta;
let oldTimeStamp;
let fps;

window.onload = init;

function init() {
    canvas = document.getElementById('canvas');
    context = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    setupGrid(canvas);
    controls.listen();

    window.requestAnimationFrame(gameLoop);
}

function gameLoop(timeStamp) {
    delta = (timeStamp - oldTimeStamp) / 1000;
    oldTimeStamp = timeStamp;

    context.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid(context);
    showFPS();

    window.requestAnimationFrame(gameLoop);
}

function showFPS() {
    fps = Math.round(1 / delta);

    context.font = '25px Arial';
    context.fillStyle = 'white';
    context.fillText("FPS: " + fps, 10, 30);
}
