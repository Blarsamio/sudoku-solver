// src/components/SudokuCell.jsx
import { PropTypes } from "prop-types";

const SudokuCell = ({
  value,
  onChange,
  row,
  col,
  isUserInput,
  solved,
  isHinted,
}) => {
  const textColorClass = solved && isUserInput ? "text-acc-1" : "text-acc-3";
  const hintClass = isHinted ? "text-yellow-300" : "";

  return (
    <input
      type="text"
      maxLength="1"
      className={`
        w-12 h-12 flex items-center justify-center text-lg font-bold bg-transparent border
        border-acc-6 text-center ${textColorClass} ${hintClass} hover:bg-acc-7 focus:bg-acc-7 focus:text-acc-3
        ${col % 3 === 0 ? 'border-l-2 border-l-acc-1' : 'border-l'}
        ${row % 3 === 0 ? 'border-t-2 border-t-acc-1' : 'border-t'}
        ${col === 8 ? 'border-r-2 border-r-acc-1' : ''}
        ${row === 8 ? 'border-b-2 border-b-acc-1' : ''}
      `}
      value={value === 0 ? "" : value}
      onChange={(e) => onChange(row, col, e.target.value)}
    />
  );
};

export default SudokuCell;

SudokuCell.propTypes = {
  value: PropTypes.number,
  onChange: PropTypes.func,
  row: PropTypes.number,
  col: PropTypes.number,
  isUserInput: PropTypes.bool,
  solved: PropTypes.bool,
  isHinted: PropTypes.bool,
};
