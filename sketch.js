// Every cols has an rows array. (2DArray maker)
const make2DArray = (cols, rows) => {
    let arr = new Array(cols);
    for (let i = 0; i < arr.length; i++) {
        arr[i] = new Array(rows);
    }
    return arr;
};

let grid;
let cols;
let rows;
const resulotion = 5;

function setup() {
    // Add canvas
    createCanvas(800, 600);
    // calculate the cols and rows
    cols = width / resulotion;
    rows = height / resulotion;

    // make the 2d array from the calculated cols and rows
    grid = make2DArray(cols, rows);

    // randomize the first setup for the grid (value: 0 or 1)
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j] = Math.round(Math.random(2));
        }
    }
}

function draw() {
    // make more visible:
    background(0);

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            let x = i * resulotion;
            let y = j * resulotion;
            if (grid[i][j] == 1) {
                fill(255);
                stroke(0);
                rect(x, y, resulotion - 1, resulotion - 1);
            }
        }
    }

    // we need a new grid where compute the new states
    let next = make2DArray(cols, rows);

    // compute next based on grid
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            let state = grid[i][j];
            // count living neighbors
            let neighbors = countNeighbors(grid, i, j);

            if (state == 0 && neighbors == 3) {
                next[i][j] = 1;
            } else if (state == 1 && (neighbors < 2 || neighbors > 3)) {
                next[i][j] = 0;
            } else {
                next[i][j] = state;
            }
        }
    }

    grid = next;
}

function countNeighbors(grid, x, y) {
    let sum = 0;
    for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
            let col = (x + i + cols) % cols;
            let row = (y + j + rows) % rows;
            sum += grid[col][row];
        }
    }
    sum -= grid[x][y];
    return sum;
}
