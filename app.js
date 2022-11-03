// ---------------- global variables ----------------
const containerSize = 500;

var mode = 'random';

var isDrawing = false;
document.body.onmousedown = () => (isDrawing = true)
document.body.onmouseup = () => (isDrawing = false)

// ---------------- event listeners ----------------
// color 🎨
let color_picker = document.getElementById('color-picker');
color_picker.addEventListener('change', changeColor);
var color_picker_wrapper = document.getElementById('color-picker-wrapper');
var current_color = color_picker.getAttribute('value');
var default_color = '#ff0000';

// random 🤖
let randBtn = document.getElementById('random');
randBtn.addEventListener('click', () => {
    mode = 'random';
});

// vintage 🕰️
let vintageBtn = document.getElementById('vintage');
vintageBtn.addEventListener('click', () => {
    mode = 'vintage';
});

// neon 🌈
let neonBtn = document.getElementById('neon');
neonBtn.addEventListener('click', () => {
    mode = 'neon';
});

// grid size slider 🎚️
let gridSlider = document.getElementById('slider');
gridSlider.addEventListener('change', (e) => {
    let div = document.getElementById('sketch-container');
    div.remove();
    createGrid(e.target.value);
});

// toggle grid lines 〰
var showGridLine = true;
let gridLines = document.getElementById('grid-lines');
gridLines.addEventListener('click', (e) => {
    showGridLine = !showGridLine;
    let grid = document.getElementsByClassName('grid-item');
    Object.values(grid).forEach(element => {
        if (showGridLine) {
            element.style.border = '1px solid';
        } else {
            element.style.border = 'none';
        }
    });
});

// color fill 🪣
let colorFillBtn = document.getElementById('color-fill');
colorFillBtn.addEventListener('click', () => {
    let grid = document.getElementsByClassName('grid-item');
    Object.values(grid).forEach(element => {
        element.style.backgroundColor = current_color;
    });
})

// color grabber ✊
let colorGrabberBtn = document.getElementById('color-grabber');
colorGrabberBtn.addEventListener('click', () => {
    let grid = document.getElementsByClassName('grid-item');
    Object.values(grid).forEach(element => {
        element.addEventListener('click', extractColor, true);
    });
})

// eraser 👝
let eraserBtn = document.getElementById('eraser');
eraserBtn.addEventListener('click', () => {
    mode = 'eraser';
})

// clear 🗑️
let clearbtn = document.getElementById('clear');
clearbtn.addEventListener('click', clear);

// ---------------- functions ----------------

function changeColorPickerStyle() {
    color_picker_wrapper.style.backgroundColor = current_color;
    color_picker_wrapper.addEventListener('click', () => {
        color_picker.click();
    })
}
changeColorPickerStyle();

// create 16 x 16 grid of square divs
function createGrid(size) {
    // create container for grid
    const sketchWrapper = document.getElementById('sketch-wrapper-id');
    const sketchContainer = document.createElement('div');
    sketchContainer.setAttribute('id', 'sketch-container');
    sketchWrapper.appendChild(sketchContainer);
    let total = size * size;
    sketchContainer.style.setProperty('--grid-rows', size);
    sketchContainer.style.setProperty('--grid-cols', size);
    for (i = 0; i < total; i++) {
        let gridCell = document.createElement('div');
        let gridSize = (containerSize / size / 2.5) + 'px';
        gridCell.style.setProperty('--grid-item-size', gridSize);
        // set an id for each cell
        gridCell.setAttribute('id', (i + 1));
        // set an attribute to check if its background color has changed
        gridCell.setAttribute('data-bgChange', false);
        // add event listeners
        sketchContainer.addEventListener('mouseover', draw)
        sketchContainer.addEventListener('mousedown', draw)
        sketchContainer.appendChild(gridCell).className = 'grid-item';
    }
}
createGrid(16);

function hexGenerator() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[(Math.floor(Math.random() * 16))];
    }
    return color;
}

function vintageGenerator() {
    let vintageArr = ['797d62', '9b9b7a', 'baa587', 'd9ae94', 'f1dca7', 'ffcb69', 'e8ac65', 'd08c60', 'b58463', '997b66'];
    const randomNumberInRange = (min = 0, max = 100) => Math.floor(Math.random() * (max - min + 1)) + min;
    let color = vintageArr[randomNumberInRange(0, vintageArr.length - 1)];
    return ('#' + color);
}

function neonGenerator() {
    let neonArr = ['offofc', 'bc13fe', '8a2be2', 'ff3131', 'ff5e00', '7afbff', '7fff00', '1904da'];
    const randomNumberInRange = (min = 0, max = 100) => Math.floor(Math.random() * (max - min + 1)) + min;
    let color = neonArr[randomNumberInRange(0, neonArr.length - 1)];
    return ('#' + color);
}

function draw(e) {
    if (e.type === 'mouseover' && !isDrawing) return
    var bgchange = e.target.getAttribute('data-bgchange');
    switch (mode) {
        case 'random':
            // go back to default color
            color_picker_wrapper.style.backgroundColor = current_color;
            if (bgchange === 'false') {
                e.target.style.backgroundColor = `${hexGenerator()}`;
                e.target.setAttribute('data-bgchange', true);
            }
            break;
        case 'change-color':
            if (bgchange === 'false') {
                e.target.style.backgroundColor = current_color;
                e.target.setAttribute('data-bgchange', true);
            }
            break;
        case 'vintage':
            if (bgchange === 'false') {
                e.target.style.backgroundColor = `${vintageGenerator()}`;
                e.target.setAttribute('data-bgchange', true);
            }
            break;
        case 'neon':
            if (bgchange === 'false') {
                e.target.style.backgroundColor = `${neonGenerator()}`;
                e.target.setAttribute('data-bgchange', true);
            }
            break;
        case 'eraser':
            e.target.style.backgroundColor = '#fff';
            e.target.setAttribute('data-bgchange', false);
            break;
    }
}

function clear() {
    let gridItems = document.getElementsByClassName('grid-item');
    Object.values(gridItems).forEach(element => {
        element.style.backgroundColor = '#fff';
        element.style.filter = 'brightness(100%)';
    })
}

function changeColor(e) {
    console.log(e.target.value)
    // first change the color picker wrapper background color to the new color
    color_picker_wrapper.style.backgroundColor = e.target.value;
    // change the color in grid
    current_color = e.target.value;
    // change mode
    mode = 'change-color';
}

function extractColor(e) {
    // extract color from grid item
    var extractedColor = e.target.style.backgroundColor
    // change extracted color to current color
    current_color = extractedColor;
    // change color picker wrapper to current color
    color_picker_wrapper.style.backgroundColor = current_color;
    // remove event listner
    let grid = document.getElementsByClassName('grid-item');
    Object.values(grid).forEach(element => {
        element.removeEventListener('click', extractColor, true);
    })
}

