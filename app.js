// global variables
const containerSize = 500;

var mode = 'random';

var isDrawing = false;
document.body.onmousedown = () => (isDrawing = true)
document.body.onmouseup = () => (isDrawing = false)

// event listeners 
// color 🎨
let color_picker = document.getElementById('color-picker');
color_picker.addEventListener('change', changeColor);
var color_picker_wrapper = document.getElementById('color-picker-wrapper');
var current_color = color_picker.getAttribute('value');

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

// clear 🗑️
let clearbtn = document.getElementById('clear');
clearbtn.addEventListener('click', clear);

function changeColorPickerStyle() {
    color_picker_wrapper.style.backgroundColor = current_color;
    color_picker_wrapper.addEventListener('click', () => {
        color_picker.click();
    })
}
changeColorPickerStyle();

// create 16 x 16 grid of square divs
function createGrid(rows, cols) {
    // create container for grid
    const sketchWrapper = document.getElementById('sketch-wrapper-id');
    const sketchContainer = document.createElement('div');
    sketchContainer.setAttribute('id', 'sketch-container');
    sketchWrapper.appendChild(sketchContainer);
    let total = rows * cols;
    sketchContainer.style.setProperty('--grid-rows', rows);
    sketchContainer.style.setProperty('--grid-cols', cols);
    for (i = 0; i < total; i++) {
        let gridCell = document.createElement('div');
        let size = (containerSize / rows / 2.5) + 'px';
        gridCell.style.setProperty('--grid-item-size', size);
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
    let color = vintageArr[randomNumberInRange(0, vintageArr.length)];
    return ('#' + color);
}

// createGrid(64, 64);
createGrid(16, 16);

function draw(e) {
    if (e.type === 'mouseover' && !isDrawing) return
    switch (mode) {
        case 'random':
            e.target.style.backgroundColor = `${hexGenerator()}`;
            break;
        case 'change-color':
            e.target.style.backgroundColor = current_color;
            break;
        case 'vintage':
            console.log(vintageGenerator());
            e.target.style.backgroundColor = `${vintageGenerator()}`;
    }



}

function clear() {
    let gridItems = document.getElementsByClassName('grid-item');
    Object.values(gridItems).forEach(element => {
        element.style.backgroundColor = '#fff';
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


