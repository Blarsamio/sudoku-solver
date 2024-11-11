// src/components/SudokuBoard.jsx
import React, { useState } from "react";
import SudokuCell from "./SudokuCell";
import SolveButton from "./SolveButton";
import ResetButton from "./ResetButton";
import { solveSudoku } from "../utils/sudokuSolver";

const SudokuBoard = () => {
  const initialBoard = Array(9).fill(Array(9).fill(0));
  const [userBoard, setUserBoard] = useState(initialBoard);
  const [displayBoard, setDisplayBoard] = useState(initialBoard);
  const [loading, setLoading] = useState(false);
  const [solved, setSolved] = useState(false);

  const handleInputChange = (row, col, value) => {
    if (/^[1-9]?$/.test(value)) {
      const newUserBoard = userBoard.map((rowArr, i) =>
        rowArr.map((cell, j) => (i === row && j === col ? Number(value) || 0 : cell))
      );
      setUserBoard(newUserBoard);
      setDisplayBoard(newUserBoard);
    }
  };

  const handleSolve = () => {
    setLoading(true);
    setTimeout(() => {
      const solvedBoard = solveSudoku(JSON.parse(JSON.stringify(userBoard)));
      setDisplayBoard(solvedBoard);
      setLoading(false);
      setSolved(true);
    }, 500); // simulate loading
  };

  const handleReset = () => {
    setUserBoard(initialBoard);
    setDisplayBoard(initialBoard);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="grid grid-cols-9 gap-1 justify-center">
        {displayBoard.map((row, rowIndex) =>
          row.map((value, colIndex) => (
            <SudokuCell
              key={`${rowIndex}-${colIndex}`}
              row={rowIndex}
              col={colIndex}
              value={value}
              onChange={handleInputChange}
              isUserInput={userBoard[rowIndex][colIndex] !== 0}
              solved={solved}
            />
          ))
        )}
      </div>
      <div className="flex space-x-2 mt-4">
        <SolveButton onClick={handleSolve} loading={loading} />
        <ResetButton onClick={handleReset} />
      </div>
    </div>
  );
};

export default SudokuBoard;
