// src/App.jsx
import React from 'react';
import SudokuBoard from './components/SudokuBoard';
import { GeistProvider, CssBaseline } from '@geist-ui/core'


const App = () => {
  return (
    <GeistProvider>
      <CssBaseline />
      <div className="flex justify-center items-center min-h-screen bg-foreground w-full">
        <SudokuBoard />
      </div>
    </GeistProvider>
  );
};

export default App;
