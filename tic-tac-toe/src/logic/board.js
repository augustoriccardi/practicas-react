import { WINNER_COMBOS } from "../constants";

const checkWinnerFrom = (boardToCheck) => {
  //revisamos todas las combinaciones ganadoras para ver si X u O ganó
  for (let combo of WINNER_COMBOS) {
    const [a, b, c] = combo;
    if (
      boardToCheck[a] &&
      boardToCheck[a] === boardToCheck[b] &&
      boardToCheck[a] === boardToCheck[c]
    ) {
      return boardToCheck[a];
    }
  }
  return null;
};

const checkEndGame = (newBoard) => {
  // revisamos si hay empate, si no hay espacios vacíos en el tablero
  return newBoard.every((square) => square !== null);
};

export { checkWinnerFrom, checkEndGame };
