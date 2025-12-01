import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SudokuGrid } from './sudoku-grid';

describe('SudokuGrid', () => {
  let component: SudokuGrid;
  let fixture: ComponentFixture<SudokuGrid>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SudokuGrid]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SudokuGrid);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
