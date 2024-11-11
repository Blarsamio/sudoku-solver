// src/components/SolveButton.jsx
import React from "react";

const SolveButton = ({ onClick, label = "Solve Sudoku", loading, className = "" }) => {
  return (
    <button
      onClick={onClick}
      className={`p-4 border border-acc-7 bg-acc-8 text-white font-bold rounded ${className} hover:bg-white hover:text-acc-9 transition-colors ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:text-acc-9'}
      transition-colors`}
    >
      {loading ? "Solving..." : label}
    </button>
  );
};

export default SolveButton;
