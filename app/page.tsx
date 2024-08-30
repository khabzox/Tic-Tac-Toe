"use client";

import { useState } from "react";
import { createTicTacToe } from "@/libs/ticTacToe";

const HomePage = () => {
  const [game] = useState(createTicTacToe());
  const [board, setBoard] = useState(game.board);
  const [winner, setWinner] = useState<string | null>(null);

  const handleClick = (row: number, col: number) => {
    if (winner || game.board[row][col]) return;

    game.makeMove(row, col);
    setBoard([...game.board]);

    const currentWinner = game.checkWinner();
    if (currentWinner) {
      setWinner(currentWinner);
    } else if (game.isBoardFull()) {
      setWinner("Draw");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Tic-Tac-Toe</h1>
      {winner && (
        <h2
          className={`text-2xl font-semibold mb-4 ${
            winner === "Draw" ? "text-gray-700" : "text-green-600"
          }`}
        >
          {winner === "Draw" ? "It's a Draw!" : `Player ${winner} Wins!`}
        </h2>
      )}
      <div className="grid grid-cols-3 gap-2 mb-4">
        {board.flat().map((cell, index) => {
          const rowIndex = Math.floor(index / 3);
          const colIndex = index % 3;
          return (
            <div
              key={index}
              className="w-20 h-20 flex items-center justify-center text-3xl font-bold border border-gray-300 bg-white cursor-pointer hover:bg-gray-200"
              onClick={() => handleClick(rowIndex, colIndex)}
            >
              {cell}
            </div>
          );
        })}
      </div>
      <button
        className="px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600"
        onClick={() => {
          const newGame = createTicTacToe(); // Create a new game instance
          setBoard([...newGame.board]); // Reset the board
          setWinner(null); // Reset the winner
          // Update the game state
          Object.assign(game, newGame);
        }}
      >
        Restart Game
      </button>
    </div>
  );
};

export default HomePage;
