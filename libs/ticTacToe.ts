export type Player = "X" | "O";
export type Board = (Player | null)[][];

export function createTicTacToe() {
  let board: Board = Array(3)
    .fill(null)
    .map(() => Array(3).fill(null));
  let currentPlayer: Player = "X";

  function makeMove(row: number, col: number): boolean {
    if (board[row][col] || checkWinner()) return false;
    board[row][col] = currentPlayer;
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    return true;
  }

  function checkWinner(): Player | null {
    const lines = [
      // Rows
      [board[0][0], board[0][1], board[0][2]],
      [board[1][0], board[1][1], board[1][2]],
      [board[2][0], board[2][1], board[2][2]],
      // Columns
      [board[0][0], board[1][0], board[2][0]],
      [board[0][1], board[1][1], board[2][1]],
      [board[0][2], board[1][2], board[2][2]],
      // Diagonals
      [board[0][0], board[1][1], board[2][2]],
      [board[0][2], board[1][1], board[2][0]],
    ];

    for (const line of lines) {
      if (line[0] && line.every((cell) => cell === line[0])) {
        return line[0];
      }
    }

    return null;
  }

  function isBoardFull(): boolean {
    return board.every((row) => row.every((cell) => cell !== null));
  }

  return {
    board,
    currentPlayer,
    makeMove,
    checkWinner,
    isBoardFull,
  };
}
