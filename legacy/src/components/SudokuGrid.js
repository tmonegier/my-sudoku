export class SudokuGrid {
    constructor({ onCellClick, onInput }) {
        this.onCellClick = onCellClick;
        this.onInput = onInput;
        this.element = document.createElement('div');
        this.element.className = 'sudoku-grid';
        this.cells = [];
        this.selectedCell = null; // {row, col}
    }

    render(grid) {
        this.element.innerHTML = '';
        this.cells = [];

        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                const cell = document.createElement('div');
                cell.className = 'sudoku-cell';
                cell.dataset.row = row;
                cell.dataset.col = col;

                // Add classes for 3x3 borders
                if (col % 3 === 2 && col !== 8) cell.classList.add('border-right');
                if (row % 3 === 2 && row !== 8) cell.classList.add('border-bottom');

                const value = grid[row][col];
                if (value !== 0) {
                    cell.textContent = value;
                    cell.classList.add('initial');
                } else {
                    cell.classList.add('editable');
                }

                cell.addEventListener('click', () => this.handleCellClick(row, col));

                this.element.appendChild(cell);
                this.cells.push(cell);
            }
        }
        return this.element;
    }

    handleCellClick(row, col) {
        if (this.selectedCell) {
            const prevIndex = this.selectedCell.row * 9 + this.selectedCell.col;
            this.cells[prevIndex].classList.remove('selected');
        }

        this.selectedCell = { row, col };
        const index = row * 9 + col;
        this.cells[index].classList.add('selected');

        // Highlight related (row, col, box) - Optional polish
        this.highlightRelated(row, col);

        if (this.onCellClick) {
            this.onCellClick(row, col);
        }
    }

    highlightRelated(row, col) {
        this.cells.forEach(cell => cell.classList.remove('highlighted'));

        // Row & Col
        for (let i = 0; i < 9; i++) {
            this.cells[row * 9 + i].classList.add('highlighted');
            this.cells[i * 9 + col].classList.add('highlighted');
        }

        // Box
        const startRow = row - (row % 3);
        const startCol = col - (col % 3);
        for (let r = 0; r < 3; r++) {
            for (let c = 0; c < 3; c++) {
                const index = (startRow + r) * 9 + (startCol + c);
                this.cells[index].classList.add('highlighted');
            }
        }
    }

    updateCell(row, col, value, isError = false) {
        const index = row * 9 + col;
        const cell = this.cells[index];
        cell.textContent = value === 0 ? '' : value;

        if (isError) {
            cell.classList.add('error');
        } else {
            cell.classList.remove('error');
        }
    }
}
