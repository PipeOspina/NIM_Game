import BoardRow from "./BoardRow";
import { Binaries, sumBinaryColumns, Bigger } from '../utils';

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

  getEnabledBinaries(): Binaries {
    const binaries: string[] = [];
    let bigger: Bigger = {
      index: 0,
      size: 0
    };
    //Recorre cada fila y convierte en binario el numero de fichas posibles
    this.getBoardRows().forEach((boardRow, i) => {
      bigger = bigger.size < boardRow.getEnabledToothpicks().length ?
        { index: i, size: boardRow.getEnabledToothpicks().length } :
        { index: bigger.index, size: bigger.size };
      binaries.push(boardRow.getEnabledBinary())
    });
    //Agrega de primero el index del mayor tamaño de las fichas posibles
    binaries.unshift(bigger.index.toString());
    //retorna un arreglo con los binarios normalizados (todos con el mismo numero de numeros)
    // ej: '1010' es el numero mayor en el arreglo, entonces '10' debería ser '0010' para que tenga el mismo numero de numeros
    const result = sumBinaryColumns(binaries);
    result.bigger = bigger;
    return result;
  }

  consoleDraw(): void {
    console.clear()
    let endLine = '';
    this.boardRows.forEach((boardRow, i) => {
      let row: string = '';
      let color: string[] = [];
      row += (i === Math.floor(this.rows / 2)) ? `i   ${i}` : `|   ${i}`;
      let columnToPrint = '';
      let whereToPrintJ = '';
      for (let j = 0; j < 24; j++) {
        if (i === 0) {
          whereToPrintJ += (j === Math.floor(this.columns / 2)) ? '== j ===' : '========';
          endLine += '========';
          columnToPrint += j < 10 ? `   |   ${j}` : `   |  ${j}`;
        }
        row += boardRow.getToothpicks()[j] ? '   %c|   ' : j === 24 ? '   |    ' : '   %c|    ';
        row += boardRow.getToothpicks()[j] ? boardRow.getToothpicks()[j].isEnabled() ? `%cE` : '%cD' : '';
        color[(j * 2) + 1] = boardRow.getToothpicks()[j] ? boardRow.getToothpicks()[j].isEnabled() ? `color: green` : 'color: red' : '';
        color[j * 2] = boardRow.getToothpicks()[j] ? `color: black` : '';
      }
      if (i === 0) {
        console.log(`|====${whereToPrintJ}===|`);
        console.log(`|    ${columnToPrint}   |`);
        console.log(`|====${endLine}===|`);
      }
      console.log(
        `${row}   %c|`,
        color[0],
        color[1],
        color[2],
        color[3],
        color[4],
        color[5],
        color[6],
        color[7],
        color[8],
        color[9],
        color[10],
        color[11],
        color[12],
        color[13],
        color[14],
        color[15],
        color[16],
        color[17],
        color[18],
        color[19],
        color[20],
        color[21],
        color[22],
        color[23],
        color[24],
        color[25],
        color[26],
        color[27],
        color[28],
        color[29],
        color[30],
        color[31],
        color[32],
        color[33],
        color[34],
        color[35],
        color[36],
        color[37],
        color[38],
        color[39],
        color[40],
        color[41],
        color[42],
        color[43],
        color[44],
        color[45],
        color[46],
        color[47]
      );
    });
    console.log(`|====${endLine}===|`);
  }
}
