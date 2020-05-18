import {highlightTile} from './grid.js';

let controls = {
    listen () {
        window.addEventListener('mousemove', (e) => {
            this.mousePos.x = e.clientX;
            this.mousePos.y = e.clientY;
            this.onMouseMove();
        });
    },
    mousePos: {
        x: 0,
        y: 0
    },
    onMouseMove () {
        highlightTile(this.mousePos);
    }
};

export {controls};