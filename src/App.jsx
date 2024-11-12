// src/App.jsx
import React from "react";
import SudokuBoard from "./components/SudokuBoard";

const App = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-foreground w-full">
      <SudokuBoard />
    </div>
  );
};

export default App;
