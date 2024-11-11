// src/components/SudokuBoard.jsx
import React, { useState } from 'react';
import SudokuCell from './SudokuCell';
import SolveButton from './SolveButton';
import { solveSudoku } from '../utils/sudokuSolver';

const SudokuBoard = () => {
  const [board, setBoard] = useState(Array(9).fill(Array(9).fill(0)));

  const handleInputChange = (row, col, value) => {
    const newBoard = board.map((rowArr, i) =>
      rowArr.map((cell, j) => (i === row && j === col ? Number(value) || 0 : cell))
    );
    setBoard(newBoard);
  };

  const handleSolve = () => {
    const solvedBoard = solveSudoku(JSON.parse(JSON.stringify(board)));
    setBoard(solvedBoard);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="grid grid-cols-9 gap-1">
        {board.map((row, rowIndex) =>
          row.map((value, colIndex) => (
            <SudokuCell
              key={`${rowIndex}-${colIndex}`}
              row={rowIndex}
              col={colIndex}
              value={value}
              onChange={handleInputChange}
            />
          ))
        )}
      </div>
      <SolveButton onClick={handleSolve} className="mt-4" />
    </div>
  );
};

export default SudokuBoard;
