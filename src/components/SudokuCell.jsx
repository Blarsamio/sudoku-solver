// src/components/SudokuCell.jsx
import React from 'react';

const SudokuCell = ({ value, onChange, row, col, isUserInput, solved }) => {
  const borderClass = `
    ${row === 3 || row === 6 ? 'mt-1' : 'mt-0'}
    ${col === 3 || col === 6 ? 'ml-1' : 'ml-0'}
  `;

  const textColorClass = solved && isUserInput ? 'text-acc-6 font-bold' : 'text-acc-2';

  return (
    <input
      type="text"
      maxLength="1"
      className={`w-10 h-10 text-2xl font-bold text-white text-center rounded border bg-acc-8 border-acc-7 ${borderClass} focus:outline-none focus:ring-1 focus:ring-acc-1
                  hover:bg-acc-6 transition-colors ${textColorClass}`}
      value={value === 0 ? '' : value}
      onChange={(e) => onChange(row, col, e.target.value)}
    />
  );
};

export default SudokuCell;
