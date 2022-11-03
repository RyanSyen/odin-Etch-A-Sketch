// ---------------- global variables ----------------
const containerSize = 500;

var mode = 'change-color';

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
var showRandomMode = false;
let randBtn = document.getElementById('random');
// randBtn.classList.add('active');
randBtn.addEventListener('click', () => {
    // toggle random mode
    showRandomMode = !showRandomMode;
    if (showRandomMode) {
        makeElementActive(randBtn);
        mode = 'random';
    } else {
        // reset default active to random mode
        resetActive();
    }
});

// vintage 🕰️
var showVintageMode = false;
let vintageBtn = document.getElementById('vintage');
vintageBtn.addEventListener('click', () => {
    // toggle vintage mode
    showVintageMode = !showVintageMode;
    if (showVintageMode) {
        makeElementActive(vintageBtn);
        mode = 'vintage';
    } else {
        // reset default active to random mode
        resetActive();
    }
});

// neon 🌈
var showNeonMode = false;
let neonBtn = document.getElementById('neon');
neonBtn.addEventListener('click', () => {
    // toggle neon mode
    showNeonMode = !showNeonMode;
    if (showNeonMode) {
        makeElementActive(neonBtn);
        mode = 'neon';
    } else {
        // reset default active to random mode
        resetActive();
    }
});

// grid size slider 🎚️
let gridSlider = document.getElementById('slider');
gridSlider.addEventListener('change', (e) => {
    let div = document.getElementById('sketch-container');
    div.remove();
    let gridSize = document.getElementById('size');
    gridSize.innerText = `(${e.target.value} x ${e.target.value})`
    createGrid(e.target.value);
});

// toggle grid lines 〰
var showGridLine = true;
let gridLines = document.getElementById('grid-lines');
gridLines.addEventListener('click', (e) => {
    // toggle grid
    showGridLine = !showGridLine;
    let grid = document.getElementsByClassName('grid-item');
    Object.values(grid).forEach(element => {
        if (showGridLine) {
            // reset default active to random mode
            resetActive();
            element.style.border = '1px solid';
        } else {
            makeElementActive(gridLines);
            element.style.border = 'none';
        }
    });
});

// color fill 🪣
var showColorFill = false;
let colorFillBtn = document.getElementById('color-fill');
colorFillBtn.addEventListener('click', () => {
    // toggle fill
    showColorFill = !showColorFill;
    let grid = document.getElementsByClassName('grid-item');
    Object.values(grid).forEach(element => {
        if (showColorFill) {
            makeElementActive(colorFillBtn);
            element.style.backgroundColor = current_color;
            element.setAttribute('data-bgchange', true);
        } else {
            element.style.backgroundColor = '#fff';
            element.setAttribute('data-bgchange', false);
            // reset default active to random mode
            resetActive();
        }
    });

})

// color grabber ✊
var showColorGrabber = false;
let colorGrabberBtn = document.getElementById('color-grabber');
colorGrabberBtn.addEventListener('click', () => {
    // toggle color grabber
    showColorGrabber = !showColorGrabber;
    let grid = document.getElementsByClassName('grid-item');
    Object.values(grid).forEach(element => {
        if (showColorGrabber) {
            makeElementActive(colorGrabberBtn);
            element.addEventListener('click', extractColor, true);
        } else {
            // reset default active to random mode
            resetActive();
            mode = 'change-color';
        }
    });
})

// eraser 👝
var showEraser = false;
let eraserBtn = document.getElementById('eraser');
eraserBtn.addEventListener('click', () => {
    // toggle eraser
    showEraser = !showEraser;
    if (showEraser) {
        makeElementActive(eraserBtn);
        mode = 'eraser';
    } else {
        // reset default active to random mode
        resetActive();
    }
})

// dark shading 🖤
var showDarkShading = false;
let darkShadeBtn = document.getElementById('dark-shading');
darkShadeBtn.addEventListener('click', () => {
    // toggle dark shading
    showDarkShading = !showDarkShading;
    if (showDarkShading) {
        makeElementActive(darkShadeBtn);
        mode = 'shade';
    } else {
        // reset default active to random mode
        resetActive();
    }

})

// light shading 🖤
var showLightShading = false;
let lightShadeBtn = document.getElementById('lighten');
lightShadeBtn.addEventListener('click', () => {
    // toggle light shading
    showLightShading = !showLightShading;
    if (showLightShading) {
        makeElementActive(lightShadeBtn);
        mode = 'lighten';
    } else {
        // reset default active to random mode
        resetActive();
    }
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
        // set an attribute to check its shading
        gridCell.setAttribute('data-shade', 10);
        // add event listeners onto the canvas
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
    e.preventDefault();
    if (e.type === 'mouseover' && !isDrawing) return
    var bgchange = e.target.getAttribute('data-bgchange');
    var currentShade = parseInt(e.target.getAttribute('data-shade'));
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
        case 'shade':
            let darkenedShade = (currentShade - 1);
            e.target.setAttribute('data-shade', darkenedShade);
            e.target.style.filter = `brightness(${darkenedShade / 10})`;
            e.target.setAttribute('data-bgchange', false);
            break;
        case 'lighten':
            e.preventDefault();
            if (currentShade === 10) {
                e.preventDefault();
                return;
            }
            let lightShade = (currentShade + 1);
            e.target.setAttribute('data-shade', lightShade);
            e.target.style.filter = `brightness(${lightShade / 10})`;
            e.target.setAttribute('data-bgchange', false);
            break;
    }
}

function clear() {
    makeElementActive(clearbtn);
    let gridItems = document.getElementsByClassName('grid-item');
    Object.values(gridItems).forEach(element => {
        element.style.backgroundColor = '#fff';
        element.style.filter = 'brightness(100%)';
        element.setAttribute('data-bgchange', false);
    })
    // reset default active to random mode
    resetActive();
}

function changeColor(e) {
    // console.log(e.target.value)
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

function makeElementActive(el) {
    let all = document.querySelectorAll('.btn');
    Object.values(all).forEach((element) => {
        element.classList.remove('active');
    })
    el.classList.add('active');
}

function resetActive() {
    let all = document.querySelectorAll('.btn');
    Object.values(all).forEach((element) => {
        element.classList.remove('active');
    })
    mode = 'change-color';
}