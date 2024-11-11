// src/utils/sudokuSolver.js
export function solveSudoku(board) {
  const findEmptyCell = () => {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col] === 0) return [row, col];
      }
    }
    return null;
  };

  const isValid = (num, row, col) => {
    for (let i = 0; i < 9; i++) {
      if (board[row][i] === num || board[i][col] === num) return false;
      const boxRow = 3 * Math.floor(row / 3) + Math.floor(i / 3);
      const boxCol = 3 * Math.floor(col / 3) + (i % 3);
      if (board[boxRow][boxCol] === num) return false;
    }
    return true;
  };

  const solve = () => {
    const cell = findEmptyCell();
    if (!cell) return true;

    const [row, col] = cell;
    for (let num = 1; num <= 9; num++) {
      if (isValid(num, row, col)) {
        board[row][col] = num;
        if (solve()) return true;
        board[row][col] = 0;
      }
    }
    return false;
  };

  solve();
  return board;
}
