import { CellValue, Cell } from './types';
import { SyntheticEvent } from 'react';

interface CellProps {
    onClick: (x: number, y: number, value: CellValue) => void;
    cell: Cell;
    onRightClick: (x: number, y: number) => void;
  }
  
  const CellComponent = ({ onClick, cell, onRightClick }: CellProps) => {
    const { x, y, value } = cell;
  
    const handleRightClick = (e: SyntheticEvent) => { 
      e.preventDefault();  
      onRightClick(x, y)
    }
  
    if (cell.flagged) return (
      <div
        className="cell"
        onContextMenu={handleRightClick}
      >
        🚩
      </div>
    )
  
    if (!cell.revealed) return (
      <div
        className="cell" 
        onContextMenu={handleRightClick}
        onClick={()=> onClick(x, y, value)}>
          {' '}
      </div>
    );
    
    const isEmpty = cell.value === 0;
  
    if (isEmpty) { 
      return <div className="cell empty"></div>
    } else if (value === 'X') {
      return <div className="cell mine">💣</div>
    }
  
    return (
      <div className="cell">{cell.value}</div>
    )
  }

  export default CellComponent;