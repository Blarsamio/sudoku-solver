// src/components/SudokuCell.jsx
import React from 'react';

const SudokuCell = ({ value, onChange, row, col }) => {
  const borderClass = `
    ${row === 3 || row === 6 ? 'mt-1' : ''}
  `;

  return (
    <input
      type="text"
      maxLength="1"
      className={`w-10 h-10 text-2xl font-bold text-white text-center rounded border bg-acc-8 border-acc-7 ${borderClass}`}
      value={value === 0 ? '' : value}
      onChange={(e) => onChange(row, col, e.target.value)}
    />
  );
};

export default SudokuCell;
