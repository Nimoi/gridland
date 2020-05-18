import {random} from './random.js';

let origin = {
    x: 0,
    y: 0
};
let offset;
let tilesWide;
let tilesHigh;

const tileSize = 24;
let tiles = [];
let colors = [
    '0084ff',
    'ff3311',
    '5511ee',
    '33ee51',
    'a4e129'
];

function setupGrid (canvas) {
    tilesWide = Math.ceil(canvas.width / tileSize);
    tilesHigh = Math.ceil(canvas.height / tileSize);
    for (let y = 0; y < tilesHigh; y++) {
        let row = [];
        for (let x = 0; x < tilesWide; x++) {
            row.push({
                color: `#${colors[random.int(4)]}`,
                hover: false,
                selected: false
            });
        }
        tiles.push(row);
    }
}

function setupOffset (canvas) {
    offset = {
        x: origin.x - (canvas.width / 2),
        y: origin.y - (canvas.height / 2),
    }
}

function drawGrid (context) {
    loopTiles((tile, x, y) => {
        let xOffset = x * tileSize;
        let yOffset = y * tileSize;
        if (! tile) {
            return;
        }
        context.fillStyle = tile.color;
        context.fillRect(xOffset, yOffset, tileSize, tileSize);
        if (tile.hover) {
            context.strokeStyle = '#fffefa';
            context.strokeRect(xOffset, yOffset, tileSize, tileSize);
        }
    });
}

function getTileFromGrid (mousePos) {
    let tileX = Math.floor(mousePos.x / tileSize);
    let tileY = Math.floor(mousePos.y / tileSize);
    return tiles[tileY][tileX];
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
