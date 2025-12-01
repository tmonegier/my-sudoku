import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sudoku-grid',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sudoku-grid.html',
  styleUrl: './sudoku-grid.css',
})
export class SudokuGrid implements AfterViewInit, OnChanges {
  @Input() grid: number[][] = [];
  @Input() initialGrid: number[][] = [];
  @Output() cellClick = new EventEmitter<{ row: number, col: number }>();

  @ViewChild('sudokuCanvas', { static: false }) canvasRef!: ElementRef<HTMLCanvasElement>;

  selectedCell: { row: number, col: number } | null = null;
  hoveredCell: { row: number, col: number } | null = null;

  private canvas!: HTMLCanvasElement;
  private ctx!: CanvasRenderingContext2D;
  private cellSize = 0;
  private canvasSize = 540; // 9 cells * 60px each

  ngAfterViewInit(): void {
    this.canvas = this.canvasRef.nativeElement;
    this.ctx = this.canvas.getContext('2d')!;

    // Set canvas size
    this.canvas.width = this.canvasSize;
    this.canvas.height = this.canvasSize;
    this.cellSize = this.canvasSize / 9;

    // Add mouse move listener for hover effect
    this.canvas.addEventListener('mousemove', this.handleMouseMove.bind(this));
    this.canvas.addEventListener('mouseleave', this.handleMouseLeave.bind(this));

    this.drawGrid();
  }

  ngOnChanges(): void {
    if (this.ctx) {
      this.drawGrid();
    }
  }

  private drawGrid(): void {
    if (!this.ctx) return;

    // Clear canvas
    this.ctx.clearRect(0, 0, this.canvasSize, this.canvasSize);

    // Draw cells
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        this.drawCell(row, col);
      }
    }

    // Draw grid lines
    this.drawGridLines();
  }

  private drawCell(row: number, col: number): void {
    const x = col * this.cellSize;
    const y = row * this.cellSize;
    const isInitial = this.isInitialCell(row, col);
    const isSelected = this.isSelected(row, col);
    const isHighlighted = this.isHighlighted(row, col);
    const isHovered = this.hoveredCell?.row === row && this.hoveredCell?.col === col;

    // Background color
    if (isSelected) {
      this.ctx.fillStyle = '#60a5fa'; // Primary color
    } else if (isHovered && !isInitial) {
      this.ctx.fillStyle = '#60a5fa'; // Primary color on hover
    } else if (isHighlighted) {
      this.ctx.fillStyle = 'rgba(96, 165, 250, 0.1)'; // Light blue
    } else if (isInitial) {
      this.ctx.fillStyle = 'rgba(0, 0, 0, 0.03)'; // Light gray
    } else {
      this.ctx.fillStyle = '#ffffff'; // White
    }
    this.ctx.fillRect(x, y, this.cellSize, this.cellSize);

    // Draw number
    const value = this.grid[row]?.[col];
    if (value && value !== 0) {
      this.ctx.font = `${isInitial ? 'bold' : '500'} ${this.cellSize * 0.5}px Inter, sans-serif`;

      if (isSelected || (isHovered && !isInitial)) {
        this.ctx.fillStyle = '#ffffff'; // White text on selected/hovered
      } else if (isInitial) {
        this.ctx.fillStyle = '#1e293b'; // Dark text for initial
      } else {
        this.ctx.fillStyle = '#60a5fa'; // Primary color for editable
      }

      this.ctx.textAlign = 'center';
      this.ctx.textBaseline = 'middle';
      this.ctx.fillText(
        value.toString(),
        x + this.cellSize / 2,
        y + this.cellSize / 2
      );
    }
  }

  private drawGridLines(): void {
    this.ctx.strokeStyle = '#e2e8f0'; // Border color
    this.ctx.lineWidth = 1;

    // Draw thin grid lines
    for (let i = 0; i <= 9; i++) {
      this.ctx.beginPath();
      this.ctx.moveTo(i * this.cellSize, 0);
      this.ctx.lineTo(i * this.cellSize, this.canvasSize);
      this.ctx.stroke();

      this.ctx.beginPath();
      this.ctx.moveTo(0, i * this.cellSize);
      this.ctx.lineTo(this.canvasSize, i * this.cellSize);
      this.ctx.stroke();
    }

    // Draw thick 3x3 box lines
    this.ctx.strokeStyle = '#1e293b'; // Dark color
    this.ctx.lineWidth = 2;

    for (let i = 0; i <= 9; i += 3) {
      this.ctx.beginPath();
      this.ctx.moveTo(i * this.cellSize, 0);
      this.ctx.lineTo(i * this.cellSize, this.canvasSize);
      this.ctx.stroke();

      this.ctx.beginPath();
      this.ctx.moveTo(0, i * this.cellSize);
      this.ctx.lineTo(this.canvasSize, i * this.cellSize);
      this.ctx.stroke();
    }
  }

  handleCanvasClick(event: MouseEvent): void {
    const rect = this.canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const col = Math.floor(x / this.cellSize);
    const row = Math.floor(y / this.cellSize);

    if (row >= 0 && row < 9 && col >= 0 && col < 9) {
      this.handleCellClick(row, col);
    }
  }

  private handleMouseMove(event: MouseEvent): void {
    const rect = this.canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const col = Math.floor(x / this.cellSize);
    const row = Math.floor(y / this.cellSize);

    if (row >= 0 && row < 9 && col >= 0 && col < 9) {
      if (this.hoveredCell?.row !== row || this.hoveredCell?.col !== col) {
        this.hoveredCell = { row, col };
        this.drawGrid();
      }

      // Change cursor for editable cells
      this.canvas.style.cursor = this.isInitialCell(row, col) ? 'default' : 'pointer';
    }
  }

  private handleMouseLeave(): void {
    if (this.hoveredCell) {
      this.hoveredCell = null;
      this.drawGrid();
    }
    this.canvas.style.cursor = 'default';
  }

  private isInitialCell(row: number, col: number): boolean {
    return this.initialGrid[row]?.[col] !== 0;
  }

  private isSelected(row: number, col: number): boolean {
    return this.selectedCell?.row === row && this.selectedCell?.col === col;
  }

  private isHighlighted(row: number, col: number): boolean {
    if (!this.selectedCell) return false;

    const { row: selRow, col: selCol } = this.selectedCell;

    // Same row or column
    if (row === selRow || col === selCol) return true;

    // Same 3x3 box
    const startRow = selRow - (selRow % 3);
    const startCol = selCol - (selCol % 3);
    return row >= startRow && row < startRow + 3 && col >= startCol && col < startCol + 3;
  }

  private handleCellClick(row: number, col: number): void {
    if (this.isInitialCell(row, col)) return;

    this.selectedCell = { row, col };
    this.cellClick.emit({ row, col });
    this.drawGrid();
  }
}

