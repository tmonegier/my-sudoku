import { Injectable } from '@angular/core';

export const BLANK = 0;

@Injectable({
    providedIn: 'root'
})
export class SudokuLogicService {
    createEmptyGrid(): number[][] {
        return Array.from({ length: 9 }, () => Array(9).fill(BLANK));
    }

    isValid(grid: number[][], row: number, col: number, num: number): boolean {
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

    solveGrid(grid: number[][]): boolean {
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (grid[row][col] === BLANK) {
                    const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
                    this.shuffleArray(nums);

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

    shuffleArray(array: number[]): void {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    generateSolvedGrid(): number[][] {
        const grid = this.createEmptyGrid();
        this.solveGrid(grid);
        return grid;
    }

    generatePuzzle(difficulty: 'easy' | 'medium' | 'hard' = 'easy'): { solved: number[][], puzzle: number[][] } {
        const solvedGrid = this.generateSolvedGrid();
        const puzzleGrid = solvedGrid.map(row => [...row]);

        let attempts = 30;
        switch (difficulty) {
            case 'easy': attempts = 30; break;
            case 'medium': attempts = 45; break;
            case 'hard': attempts = 55; break;
        }

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
