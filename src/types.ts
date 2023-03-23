export type GameConfig = {
    rows: number;
    columns: number;
    bombs: number;
}
  
export type CellValue = 'X' | number;
  
export type Cell = {
    value: CellValue;
    x: number;
    y: number;
    revealed: boolean;
    flagged: boolean;
}

export type CellToCheck = {
    x: number;
    y: number;
  }