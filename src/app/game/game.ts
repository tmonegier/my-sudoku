import { Component, OnInit, HostListener } from '@angular/core';
import { SudokuGrid } from '../sudoku-grid/sudoku-grid';
import { SudokuLogicService } from '../services/sudoku-logic.service';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [SudokuGrid],
  templateUrl: './game.html',
  styleUrl: './game.css',
})
export class Game implements OnInit {
  currentGrid: number[][] = [];
  initialGrid: number[][] = [];
  solution: number[][] = [];
  selectedCell: { row: number, col: number } | null = null;
  difficulty: 'easy' | 'medium' | 'hard' = 'easy';

  constructor(private sudokuLogic: SudokuLogicService) { }

  ngOnInit(): void {
    this.startNewGame();
  }

  startNewGame(): void {
    const { puzzle, solved } = this.sudokuLogic.generatePuzzle(this.difficulty);
    this.initialGrid = puzzle.map(row => [...row]);
    this.currentGrid = puzzle.map(row => [...row]);
    this.solution = solved;
    this.selectedCell = null;
  }

  onCellClick(event: { row: number, col: number }): void {
    this.selectedCell = event;
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent): void {
    if (!this.selectedCell) return;

    const { row, col } = this.selectedCell;

    // Only allow input on editable cells
    if (this.initialGrid[row][col] !== 0) return;

    if (event.key >= '1' && event.key <= '9') {
      const num = parseInt(event.key);
      this.currentGrid[row][col] = num;

      // Check if puzzle is complete
      if (this.isPuzzleComplete()) {
        alert('Congratulations! You solved the puzzle!');
      }
    } else if (event.key === 'Backspace' || event.key === 'Delete' || event.key === '0') {
      this.currentGrid[row][col] = 0;
    }
  }

  isPuzzleComplete(): boolean {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (this.currentGrid[i][j] !== this.solution[i][j]) return false;
      }
    }
    return true;
  }

  changeDifficulty(difficulty: 'easy' | 'medium' | 'hard'): void {
    this.difficulty = difficulty;
  }
}
