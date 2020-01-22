import BoardRow from "./BoardRow";

export default class Board {
  private rows: number;
  private columns: number;
  private boardRows: BoardRow[];

  constructor(rows?: number, columns?: number) {
    this.rows = rows || Math.floor(Math.random() * 9) + 2;
    this.columns = columns || 0;
    this.boardRows = [];
    let bigger: number = 0;
    for (let i = 0; i < this.rows; i++) {
      this.boardRows[i] = new BoardRow(this.columns);
      bigger =
        this.boardRows[i].getSize() > bigger
          ? this.boardRows[i].getSize()
          : bigger;
    }
    this.columns = bigger;
  }

  getRows(): number {
    return this.rows;
  }

  getColumns(): number {
    return this.columns;
  }

  getBoardRows(): BoardRow[] {
    return this.boardRows;
  }

  setBoardRows(boardRows: BoardRow[]): void {
    this.boardRows = boardRows;
  }

  consoleDraw(): void {
    console.log("|=====================================|");
    const rows: string[] = [];
    this.boardRows.forEach((boardRow, i) => {
      let row: string = "| ";
      boardRow.getToothpicks().forEach((toothpick, j) => {
        row += `(${i},${j}) `;
        row += toothpick.isEnabled() ? "=D   |   " : "";
      });
      rows.push(row);
    });
    rows.forEach(item => {
      console.log(item);
    });
  }
}
