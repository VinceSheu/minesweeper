import { useEffect, useState } from 'react';
import './App.css';
import Settings from './Settings';
import CellComponent from './Cell';
import { random } from './utils';
import { Cell, CellValue, GameConfig, CellToCheck } from './types';

function App() {
  const [gameConfig, setGameConfig] = useState<GameConfig>({ 
    rows: 9,
    columns: 9, 
    bombs: 10
  });

  const [bombsLocation, setBombLocation] = useState<{x: number, y: number}[]>([]);
  const [gameBoard, setBoard] = useState<Cell[][]>([]);
  const { rows, columns, bombs } = gameConfig;
  const [nonMinesCount, setNonMinesCount] = useState(9000);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if (nonMinesCount === 0) {
      setGameOver(true);
      alert('You Win');
    }
  }, [nonMinesCount])

  useEffect(() => {
    let newBoard: Array<Cell>[] = [];
    for (let x=0; x<rows; x++){
      newBoard[x] = [];
      for (let y=0; y<columns; y++) {
        newBoard[x].push({
          value: 0,
          revealed: false,
          x,
          y,
          flagged: false
        })
      }
    }

    let bombsCount = 0;
    let newBombLocations = [];
    while (bombsCount < bombs){
      let x = random(0, rows - 1);
      let y = random(0, columns - 1);

      if (newBoard[x][y].value === 0){
        newBoard[x][y].value = 'X';
        newBombLocations.push({x, y});
        bombsCount++;
      }
    }

    for (let x=0; x<rows; x++){
      for (let y=0; y<columns; y++) {

        if (newBoard[x][y].value === 'X'){

          if (x-1>=0) {
            //top
            if (typeof newBoard[x-1][y].value === 'number') {
              newBoard[x-1][y].value = (newBoard[x-1][y].value as number) + 1;
            }

            // top left
            if (y-1>=0 && typeof newBoard[x-1][y-1].value === 'number'){ 
                newBoard[x-1][y-1].value = newBoard[x-1][y-1].value as number + 1;
            }

            // top right
            if (y+1 <= columns-1 && typeof newBoard[x-1][y+1].value === 'number') {
              newBoard[x-1][y+1].value = newBoard[x-1][y+1].value as number + 1;
            }

          }

          // left 
          if (y-1>=0){
            if (typeof newBoard[x][y-1].value === 'number') {
              newBoard[x][y-1].value = newBoard[x][y-1].value as number + 1;
            }
          }

          // right
          if (y+1 <= columns-1){
            if (typeof newBoard[x][y+1].value === 'number') {
              newBoard[x][y+1].value = newBoard[x][y+1].value as number + 1;
            }
          }

          if (x+1 <= rows-1){
            // bottom
            if (typeof newBoard[x+1][y].value === 'number') {
              newBoard[x+1][y].value = newBoard[x+1][y].value as number + 1;
            }

            // bottom left
            if (y-1>=0 && typeof newBoard[x+1][y-1].value === 'number') {
              newBoard[x+1][y-1].value = newBoard[x+1][y-1].value as number + 1;
            }

            // bottom right
            if (y+1 <= columns-1 && typeof newBoard[x+1][y+1].value === 'number') {
              newBoard[x+1][y+1].value = newBoard[x+1][y+1].value as number + 1;
            }
          }
        }
      }
    }
    setBoard(newBoard);
    setBombLocation(newBombLocations);
    setNonMinesCount(rows * columns - bombs);
  }, [bombs, columns, gameConfig, rows])

  

  const revealArea = (firstCell: CellToCheck) => {
    let newNonMinesCount = nonMinesCount;
    let cellsWithSiblingsToCheck: CellToCheck[] = [firstCell];
    let newBoard: Cell[][] = JSON.parse(JSON.stringify(gameBoard));
    newBoard[firstCell.x][firstCell.y].revealed = true;
    newNonMinesCount--;

    while (cellsWithSiblingsToCheck.length > 0) {
      const currentCell = cellsWithSiblingsToCheck.pop();
      if (currentCell) {
        let { x, y } =  currentCell;

        if (x-1>=0 && !newBoard[x-1][y].revealed) {
          //top
          if (newBoard[x-1][y].value === 0) {
            cellsWithSiblingsToCheck.push({x: x-1, y});
          }
          newBoard[x-1][y].revealed = true;
          newNonMinesCount--;
    
          // top left
          if (y-1>=0 && !newBoard[x-1][y-1].revealed){
            if (newBoard[x-1][y-1].value === 0 ) {
              cellsWithSiblingsToCheck.push({x: x-1, y: y-1});
            }
            newBoard[x-1][y-1].revealed = true;
            newNonMinesCount--;
          }
          
    
          // top right
          if (y+1 <= columns-1 && !newBoard[x-1][y+1].revealed) {
            if (newBoard[x-1][y+1].value === 0 ) {
              cellsWithSiblingsToCheck.push({x: x-1, y: y+1});
            }
            newBoard[x-1][y+1].revealed = true;
            newNonMinesCount--;
          }
    
        }
    
        // left 
        if (y-1>=0 && !newBoard[x][y-1].revealed){
          if (newBoard[x][y-1].value === 0) {
            cellsWithSiblingsToCheck.push({x, y: y-1});
          }
          newBoard[x][y-1].revealed = true;
          newNonMinesCount--;
        }
    
        // right
        if (y+1 <= columns-1 && !newBoard[x][y+1].revealed){
          if (newBoard[x][y+1].value === 0 ) {
            cellsWithSiblingsToCheck.push({x, y: y+1});
          }
          newBoard[x][y+1].revealed = true;
          newNonMinesCount--;
        }
    
        if (x+1 <= rows-1 && !newBoard[x+1][y].revealed){
          // bottom
          if (newBoard[x+1][y].value === 0 ) {
            cellsWithSiblingsToCheck.push({x: x+1, y});
          }
          newBoard[x+1][y].revealed = true;
          newNonMinesCount--;
    
          // bottom left
          if (y-1>=0 && !newBoard[x+1][y-1].revealed) {
            if (newBoard[x+1][y-1].value === 0) {
              cellsWithSiblingsToCheck.push({x: x+1, y: y-1});
            }
            newBoard[x+1][y-1].revealed = true;
            newNonMinesCount--;
          }
    
          // bottom right
          if (y+1 <= columns-1 && !newBoard[x+1][y+1].revealed) {
            if (newBoard[x+1][y+1].value === 0 ) {
              cellsWithSiblingsToCheck.push({x: x+1, y: y+1});
            }
            newBoard[x+1][y+1].revealed = true;
            newNonMinesCount--;
          }
        }
      }

      setBoard(newBoard);
      setNonMinesCount(newNonMinesCount);
    }
  }

  const handleClickCell = (x: number, y: number, value: CellValue) => {
    let newBoard: Cell[][] = JSON.parse(JSON.stringify(gameBoard));
    if (value === 'X'){
      bombsLocation.forEach(({x, y}) => {
        newBoard[x][y].revealed = true;
      });
      setBoard(newBoard);
      setGameOver(true);
    } else if (value === 0){
        revealArea({x, y});
    } else {
      newBoard[x][y].revealed = true;
      setBoard(newBoard);
      setNonMinesCount((prev) => (prev - 1));
    }
  }

  const onRightClickCell = (x: number, y: number) => {
    let newBoard: Cell[][] = JSON.parse(JSON.stringify(gameBoard));
    newBoard[x][y].flagged = !newBoard[x][y].flagged;
    setBoard(newBoard);
  }

  return (
    <div className="App">
      <Settings setGameConfig={setGameConfig} />
      <div>
        <div>Remaining Safe Spots: {nonMinesCount}</div>
      </div>
      <div className={`container ${gameOver ? 'disabledBoard' : ''}`}>
        <div >
          { gameBoard.map((row) => {
            return (
              <div className="row">
                {row.map((cell) => (
                  <CellComponent onRightClick={onRightClickCell} onClick={handleClickCell} cell={cell} />
                ))}
              </div>
            )
          }) }
        </div>
      </div>
      {gameOver && <div>
        <h3>Game Over</h3>
        <button onClick={() => {
          setGameConfig({ rows, columns, bombs });
          setGameOver(false);
        }}>Retry</button>
      </div>
      }
    </div>
  );
}

export default App;
