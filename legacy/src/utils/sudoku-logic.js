export const BLANK = 0;

export class SudokuLogic {
    constructor() {
        this.grid = this.createEmptyGrid();
    }

    createEmptyGrid() {
        return Array.from({ length: 9 }, () => Array(9).fill(BLANK));
    }

    // Check if placing num at grid[row][col] is valid
    isValid(grid, row, col, num) {
        // Check row
        for (let x = 0; x < 9; x++) {
            if (grid[row][x] === num) return false;
        }

        // Check col
        for (let x = 0; x < 9; x++) {
            if (grid[x][col] === num) return false;
        }

        // Check 3x3 box
        const startRow = row - (row % 3);
        const startCol = col - (col % 3);
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (grid[i + startRow][j + startCol] === num) return false;
            }
        }

        return true;
    }

    // Backtracking algorithm to solve/fill the grid
    solveGrid(grid) {
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (grid[row][col] === BLANK) {
                    const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
                    this.shuffleArray(nums); // Randomize for unique puzzles

                    for (let num of nums) {
                        if (this.isValid(grid, row, col, num)) {
                            grid[row][col] = num;

                            if (this.solveGrid(grid)) {
                                return true;
                            }

                            grid[row][col] = BLANK;
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    }

    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    generateSolvedGrid() {
        const grid = this.createEmptyGrid();
        this.solveGrid(grid);
        return grid;
    }

    // Create a puzzle by removing numbers
    generatePuzzle(difficulty = 'easy') {
        const solvedGrid = this.generateSolvedGrid();
        // Clone the grid for the puzzle
        const puzzleGrid = solvedGrid.map(row => [...row]);

        let attempts = 5;
        switch (difficulty) {
            case 'easy': attempts = 30; break;   // Remove ~30 numbers
            case 'medium': attempts = 45; break; // Remove ~45 numbers
            case 'hard': attempts = 55; break;   // Remove ~55 numbers
            default: attempts = 30;
        }

        // Naive removal: just remove N random cells. 
        // A proper generator ensures a unique solution, but for this game, 
        // we'll stick to simple removal for performance/simplicity as requested.
        // To ensure playability, we just remove random cells.

        let count = attempts;
        while (count > 0) {
            let row = Math.floor(Math.random() * 9);
            let col = Math.floor(Math.random() * 9);
            if (puzzleGrid[row][col] !== BLANK) {
                puzzleGrid[row][col] = BLANK;
                count--;
            }
        }

        return {
            solved: solvedGrid,
            puzzle: puzzleGrid
        };
    }
}
