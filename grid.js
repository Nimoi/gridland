import {random} from './random.js';

let origin = {
    x: 0,
    y: 0
};
let offset;
let tilesWide;
let tilesHigh;

const tileSize = 32;
let tiles = [];
let colors = [
    'red',
    'blue',
    'green',
    'orange',
    'black'
];

function setupGrid (canvas) {
    tilesWide = Math.ceil(canvas.width / tileSize);
    tilesHigh = Math.ceil(canvas.height / tileSize);
    for (let y = -100; y < tilesHigh; y++) {
        let row = [];
        for (let x = -100; x < tilesWide; x++) {
            row.push({
                x: x,
                y: y,
                color: `${colors[random.int(4)]}`,
                hover: false,
                selected: false
            });
        }
        tiles.push(row);
    }
    setupOffset(canvas);
}

function setupOffset (canvas) {
    offset = {
        x: origin.x - (canvas.width / 2),
        y: origin.y - (canvas.height / 2),
    }
}

function drawGrid (context) {
    loopTiles((tile, x, y) => {
        let xOffset = tile.x * tileSize - offset.x;
        let yOffset = tile.y * tileSize - offset.y;
        if (! tile) {
            return;
        }
        context.fillStyle = tile.color;
        context.fillRect(xOffset, yOffset, tileSize, tileSize);
        if (tile.hover) {
            context.strokeStyle = '#fff';
            context.strokeRect(xOffset, yOffset, tileSize, tileSize);
        }
        context.font = '12px Arial';
        context.fillStyle = 'white';
        context.fillText(`${tile.x},${tile.y}`, xOffset, yOffset + 12);
    });
}

function getTileFromGrid (mousePos) {
    let tileX = Math.floor((mousePos.x + offset.x) / tileSize);
    let tileY = Math.floor((mousePos.y + offset.y) / tileSize);
    let cornerTile = tiles[0][0];
    return tiles[tileY - cornerTile.y][tileX - cornerTile.x];
}

function highlightTile (mousePos) {
    loopTiles((tile) => {
        tile.hover = false;
    });
    let tile = getTileFromGrid(mousePos);
    tile.hover = true;
}

function loopTiles (callback) {
    for (let y = 0; y < tiles.length; y++) {
        let row = tiles[y];
        for (let x = 0; x < row.length; x++) {
            let tile = tiles[y][x];
            callback(tile, x, y);
        }
    }
}

export {setupGrid, drawGrid, highlightTile}
