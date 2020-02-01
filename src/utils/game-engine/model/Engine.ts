import Board from "./Board";
import BoardRow from "./BoardRow";
import Toothpick from "./Toothpick";
import { Binaries, Bigger } from "../utils";

export default class Engine {
  private board: Board;
  private score: number;
  private mode: 1 | 2 | 3 | "custom";
  private turn: 1 | 2 | "engine";
  private dificulty: number;
  private time: number;
  private end: boolean;
  private whoWins: 1 | 2 | "engine";
  private steps: [{
    disabledToothpicks: Toothpick[]
  }];

  constructor(
    board: Board,
    mode: 1 | 2 | 3,
    dificulty?: number
  ) {
    this.board = board;
    this.mode = mode;
    this.dificulty = dificulty || 90;
    this.time = 0;
    this.end = false;
    this.whoWins = "engine";
    this.turn = 1;
    this.score = 0;
  }

  start(callback: Function) {
    setInterval(() => {
      this.time += 1;
    }, 100);
    callback();
  }


  step(callback: Function): void {
    switch (this.mode) {
      case 1:
        this.modeOne(callback);
        break;
      case 2:
        break;
      case 3:
        break;
      default:
        break;
    }
  }



  private modeOne(callback: Function) {
    // Pasar el numero de disponibles a binario
    // verificar que haya alguna columna que no sea par
    // si hay una o mas de una, volverlas par, siempre y cuando no se cambie de fila y el numero resultante sea menor al anterior
    const binaryOfEnables: Binaries = this.board.getEnabledBinaries();
    if (binaryOfEnables.needSolution) {
      console.log(this.board.getEnabledBinaries());
      const newBinaries: string[] = [];
      binaryOfEnables.binaries.forEach((binary, i) => {
        const newBinaryArr: string[] = [];
        Array.from(binary).forEach((element, j) => {
          const isEven: boolean = binaryOfEnables.isEven[j]
          if (!isEven && element === '1') {
            newBinaryArr[j] = '0';
          } else if (!isEven && element === '0') {
            newBinaryArr[j] = '1';
          } else {
            newBinaryArr[j] = element;
          }
        })
        const newBinary = newBinaryArr.join('');
        if (Number.parseInt(newBinary, 2) < Number.parseInt(binary, 2)) {
          newBinaries[i] = newBinary;
        }
      });

      let bigger: Bigger = {
        index: 0,
        size: 0
      }

      newBinaries.forEach((binary, i) => {
        bigger = binary ? Number.parseInt(binary, 2) >= bigger.size ? { index: i, size: Number.parseInt(binary, 2) } : bigger : bigger;
      });

      let counter = this.board.getBoardRows()[bigger.index].getEnabledToothpicks().length;
      this.board.getBoardRows()[bigger.index].getEnabledToothpicks().forEach((enabled) => {
        if (counter > bigger.size) {
          enabled.disable();
          counter--;
        }
      });
      console.log(binaryOfEnables.bigger, bigger, newBinaries);
      console.log(this.board.getEnabledBinaries());
    }
  }

  private modeTwo() {
  }

  private modeThree() {
  }

  isEnd(): boolean {
    return this.end;
  }
}
