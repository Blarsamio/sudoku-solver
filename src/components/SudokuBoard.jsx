// src/components/SudokuBoard.jsx
import React, { useState } from "react";
import SudokuCell from "./SudokuCell";
import SolveButton from "./SolveButton";
import ResetButton from "./ResetButton";
import { solveSudoku } from "../utils/sudokuSolver";
import { findNextHint } from '../utils/hintSolver';


const SudokuBoard = () => {
  const initialBoard = Array(9).fill(Array(9).fill(0));
  const [userBoard, setUserBoard] = useState(initialBoard);
  const [displayBoard, setDisplayBoard] = useState(initialBoard);
  const [loading, setLoading] = useState(false);
  const [solved, setSolved] = useState(false);
  const [error, setError] = useState('');
  const [hintUsed, setHintUsed] = useState([]);

  const handleHint = () => {
    const hint = findNextHint(displayBoard);

    if (hint) {
      const { row, col, value } = hint;
      const newDisplayBoard = displayBoard.map((rowArr, r) =>
        rowArr.map((cell, c) => (r === row && c === col ? value : cell))
      );

      setDisplayBoard(newDisplayBoard);
      setHintUsed([...hintUsed, { row, col }]);
    }
  };

  const hasConflict = (board) => {
    const isValidInPlace = (num, row, col) => {
      for (let i = 0; i < 9; i++) {
        if (board[row][i] === num && i !== col) return false;
        if (board[i][col] === num && i !== row) return false;

        const boxRow = 3 * Math.floor(row / 3) + Math.floor(i / 3);
        const boxCol = 3 * Math.floor(col / 3) + (i % 3);
        if (board[boxRow][boxCol] === num && (boxRow !== row || boxCol !== col)) return false;
      }
      return true;
    };

    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        const num = board[row][col];
        if (num !== 0 && !isValidInPlace(num, row, col)) return true;
      }
    }
    return false;
  };

  const isBoardComplete = (board) => {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        const num = board[row][col];
        if (num === 0 || !hasConflict(board)) return false;
      }
    }
    return true;
  };

  const handleInputChange = (row, col, value) => {
    if (/^[1-9]?$/.test(value)) {
      const newUserBoard = userBoard.map((rowArr, i) =>
        rowArr.map((cell, j) => (i === row && j === col ? Number(value) || 0 : cell))
      );
      setUserBoard(newUserBoard);
      setDisplayBoard(newUserBoard);
      setSolved(false);
      setError('');
    }
  };

  const handleSolve = () => {
    if (hasConflict(userBoard)) {
      setError('Invalid board, check and try again.');
      return;
    }

    if (isBoardComplete(userBoard)) {
      setSolved(true);
      setDisplayBoard(userBoard);
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const solvedBoard = solveSudoku(JSON.parse(JSON.stringify(userBoard)));
      setDisplayBoard(solvedBoard);
      setLoading(false);
      setSolved(true);
    }, 500);
  };

  const handleReset = () => {
    setUserBoard(initialBoard);
    setDisplayBoard(initialBoard);
    setSolved(false);
    setError('');
    setHintUsed([]);
  };

  return (
    <div className="flex flex-col items-center">
      {error && <div className="text-red-500 mb-2">{error}</div>}
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
              isHinted={hintUsed.some(cell => cell.row === rowIndex && cell.col === colIndex)}
            />
          ))
        )}
      </div>
      <div className="flex flex-col items-center space-x-2 mt-4">
        <div className="flex space-x-2 mt-4">
          <SolveButton onClick={handleSolve} loading={loading} />
          <ResetButton onClick={handleReset} />
        </div>
        <a href="#" onClick={handleHint} className="p-4  text-white rounded">
          Stuck? get a <span className='font-extrabold'>hint.</span>
        </a>
      </div>
    </div>
  );
};

export default SudokuBoard;
