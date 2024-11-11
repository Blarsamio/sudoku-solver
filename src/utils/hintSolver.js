// src/utils/hintSolver.js
export function findNextHint(board) {
  const possibleValues = getPossibleValues(board);

  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] === 0 && possibleValues[row][col].length === 1) {
        return { row, col, value: possibleValues[row][col][0] };
      }
    }
  }
  return findStrategicMove(possibleValues);
}

function getPossibleValues(board) {
  const possibleValues = Array.from({ length: 9 }, () =>
    Array.from({ length: 9 }, () => [])
  );

  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] === 0) {
        possibleValues[row][col] = getValidValuesForCell(board, row, col);
      } else {
        possibleValues[row][col] = []; // Filled cells have no possibilities
      }
    }
  }

  return possibleValues;
}

function getValidValuesForCell(board, row, col) {
  const values = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]);

  for (let c = 0; c < 9; c++) {
    values.delete(board[row][c]);
  }

  for (let r = 0; r < 9; r++) {
    values.delete(board[r][col]);
  }

  const startRow = Math.floor(row / 3) * 3;
  const startCol = Math.floor(col / 3) * 3;
  for (let r = startRow; r < startRow + 3; r++) {
    for (let c = startCol; c < startCol + 3; c++) {
      values.delete(board[r][c]);
    }
  }

  return Array.from(values); // Convert Set to Array
}

export function findStrategicMove(possibleValues) {
  let bestMove = null;
  let minOptions = 10; // Initialize with a number greater than the max possible options (9)

  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      const options = possibleValues[row][col];

      if (options.length === 1) {
        // If only one possibility, return immediately as it’s the best choice
        return { row, col, value: options[0] };
      } else if (options.length > 1 && options.length < minOptions) {
        // Track the cell with the fewest possibilities (but more than one)
        minOptions = options.length;
        bestMove = { row, col, value: options[0] }; // Choose the first value as a hint
      }
    }
  }
  return bestMove; // Returns the cell with the fewest options or null if no moves
}
