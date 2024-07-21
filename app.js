
let grid;
const startBtn = document.getElementById("startBtn")
const stopBtn = document.getElementById("stopBtn")
const randomBtn = document.getElementById("randomBtn")

const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

const size = 20;
canvas.width = 600;
canvas.height = 600;

let cols = 30
let rows = 30


function randomState() {
    const a2Darr = [];
    for (let i = 0; i < cols; i++) {
        a2Darr[i] = [];
        for (let j = 0; j < rows; j++) {
            randomNumber = (Math.random() > 0.8) ? 1 : 0;

            a2Darr[i][j] = randomNumber;
        }
    }
    return a2Darr;
}

// console.log(randomState(cols, rows));
let a2Darr = randomState();
let isRunning = false;
let animationId = null;

function displayGrid() {
    // context.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            let cell = a2Darr[i][j]

            context.beginPath();
            context.rect(i * size, j * size, size, size);
            context.stroke()
            context.fill();
            if (cell == 1) {
                // context.beginPath();
                // context.fillRect(i * size, j * size, size, size);
                // context.stroke()
                // context.fill();
                context.fillStyle = 'black';
            } else {
                // context.beginPath();
                // context.fillRect(i * size, j * size, size, size);
                // context.stroke()
                // context.fill();
                context.fillStyle = 'bisque'
            }
        }
    }
}
// displayGrid();


function nextState() {
    const nextArr = [];
    for (let i = 0; i < cols; i++) {
        nextArr[i] = [];
        for (let j = 0; j < rows; j++) {
            let cell = a2Darr[i][j];

            let neighbours = currentNeighbours(i, j);

            if (cell === 1 && neighbours === 2) {
                nextArr[i][j] = 1
            } else if (cell === 1 && neighbours === 3) {
                nextArr[i][j] = 1
            } else if (cell === 0 && neighbours === 3) {
                nextArr[i][j] = 1
            } else if(cell ===1 && neighbours < 2){
                nextArr[i][j] = 0;
            }else if(cell ===1 && neighbours >= 4){
                nextArr[i][j] = 0;
            }else{
                nextArr[i][j] = a2Darr[i][j]
            }
        }
    }
    a2Darr = nextArr;
}


function currentNeighbours(col, row) {
    let numNeighbours = 0;

    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            const xPos = col + i;
            const yPos = row + j;

            if (xPos >= 0 && xPos < cols && yPos >= 0 && yPos < rows && !(i === 0 && j === 0)) {

                numNeighbours += a2Darr[xPos][yPos]
                console.log(numNeighbours)
            }

        }
    }
    return numNeighbours;
}

displayGrid();
function gridLoop() {
    nextState();
    displayGrid();
    if (isRunning) {
        animationId = requestAnimationFrame(gridLoop);
    }
}

startBtn.addEventListener('click', () => {
    if (!isRunning) {
        isRunning = true;
        gridLoop();
    }
});

stopBtn.addEventListener('click', () => {
    isRunning = false;
    cancelAnimationFrame(animationId);
});

randomBtn.addEventListener('click', () => {
    isRunning = false;
    cancelAnimationFrame(animationId);
    a2Darr = randomState();
    displayGrid();
});
