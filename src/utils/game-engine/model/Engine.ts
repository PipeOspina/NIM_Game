import Board from "./Board";
import BoardRow from "./BoardRow";
import Toothpick from "./Toothpick";

export default class Engine {
  private board: Board;
  private score: number;
  private mode: 1 | 2 | 3 | "custom";
  private turn: 1 | 2 | "engine";
  private enginePlays: boolean;
  private dificulty: number;
  private time: number;
  private end: boolean;
  private whoWins: 1 | 2 | "engine";

  constructor(
    board: Board,
    mode: 1 | 2 | 3,
    enginePlays?: boolean,
    dificulty?: number
  ) {
    this.board = board;
    this.mode = mode;
    this.enginePlays = enginePlays || false;
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

  private modeOne(callback: Function) {
    if (this.enginePlays) {
      const newSizes: number[] = this.binaryToInt(this.getBinaries());
      this.board.getBoardRows().forEach((boardRow, i) => {
        const enabledItems = boardRow.getEnabledToothpicks();
        if (enabledItems.length !== newSizes[i]) {
          const sub: number = enabledItems.length - newSizes[i];
          console.log(sub);
          for (let j = 0; j < sub; j++) {
            const itemsToDisable = boardRow.getEnabledToothpicks();
            const randomIndex: number = Math.floor(
              Math.random() * itemsToDisable.length
            );
            itemsToDisable[randomIndex].disable();
          }
        }
      });
      callback();
    } else {
      callback();
    }
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

  private modeTwo() {
    if (this.enginePlays) {
    }
  }

  private modeThree() {
    if (this.enginePlays) {
    }
  }

  isEnd(): boolean {
    return this.end;
  }

  private parseBinary(num: number, size: number): string {
    let parsed: string = num.toString(2);
    while (parsed.length < size) parsed = "0" + parsed;
    return parsed;
  }
  private bigger(binaryArr: string[]): number {
    let bigger: number = 0;
    let index: number = -1;
    binaryArr.forEach((item, i) => {
      if (Number.parseInt(item, 2) > bigger) {
        bigger = Number.parseInt(item, 2);
        index = i;
      }
    });
    return index;
  }

  private fixedBinaryArr(toFix: string[]): string[] {
    let fixed: string[] = [];
    const sums = this.getSums(toFix);
    let selectedRow: number;
    let isOdd: boolean = false;
    for (selectedRow = 0; selectedRow < toFix.length; selectedRow++) {
      sums.forEach((sum, i) => {
        if (sum % 2 !== 0) {
          isOdd = true;
          const selectedItem: string = toFix[selectedRow].charAt(i);
          const slicedFirst: string = fixed[selectedRow]
            ? fixed[selectedRow].slice(0, i)
            : toFix[selectedRow].slice(0, i);
          const slicedLast: string = fixed[selectedRow]
            ? fixed[selectedRow].slice(i + 1)
            : toFix[selectedRow].slice(i + 1);
          let isBigger: boolean = false;
          for (let j = 0; j < i; j++)
            isBigger = toFix[selectedRow].charAt(j) === "1";
          fixed[selectedRow] =
            selectedItem === "1"
              ? `${slicedFirst}0${slicedLast}`
              : isBigger
              ? `${slicedFirst}1${slicedLast}`
              : toFix[selectedRow];
        }
      });
      const sizeToFix: number = Number.parseInt(toFix[selectedRow], 2);
      const sizeFixed: number = Number.parseInt(fixed[selectedRow], 2);
      if (sizeFixed < sizeToFix) {
        break;
      } else {
        isOdd = false;
      }
    }
    toFix.forEach((item, i) => {
      fixed[i] = i === selectedRow && isOdd ? fixed[i] : item;
    });
    /*sums.forEach((sum, i) => {
      if (sum % 2 !== 0) {
        isOdd = true;
        toFix.forEach((num: string, j: number) => {
          const column = Number.parseInt(num.charAt(i));
          if (column === 1 && j === selectedRow) {
            fixed[j] = !fixed[j]
              ? num.slice(0, i) + "0" + num.slice(i + 1)
              : fixed[j].slice(0, i) + "0" + fixed[j].slice(i + 1);
          } else if (column === 0 && j === selectedRow) {
            let isBigger: boolean = false;
            for (let k = 0; k < j; k++) {
              if (num.charAt(k) === "1" || fixed[j].charAt(k) === "1")
                isBigger = true;
            }
            if (!isBigger) {
              fixed[j] = !fixed[j]
                ? num.slice(0, i) + "1" + num.slice(i + 1)
                : fixed[j].slice(0, i) + "1" + fixed[j].slice(i + 1);
            } else {
              fixed[j] = num;
            }
          } else {
            fixed[j] = num;
          }
        });
      }
    });*/
    if (!isOdd) {
      const randomRow: number = Math.floor(Math.random() * toFix.length);
      const size = Number.parseInt(toFix[randomRow], 2);
      const randomQuantity: number = Math.floor(Math.random() * size);
      toFix.forEach((num, i) => {
        fixed[i] = i === randomRow ? randomQuantity.toString(2) : num;
      });
    }
    console.log("fixed:", fixed);
    fixed.push(selectedRow.toString());
    return fixed;
  }

  private getBinaries(): string[] {
    const arr: string[] = [];
    this.board.getBoardRows().forEach(boardRow => {
      arr.push(
        this.parseBinary(
          boardRow.getEnabledToothpicks().length,
          this.board.getColumns().toString(2).length
        )
      );
    });
    const fixed = this.fixedBinaryArr(arr);
    fixed.pop();
    return fixed;
  }

  private binaryToInt(arr: string[]): number[] {
    const sizes: number[] = [];
    arr.forEach(item => sizes.push(Number.parseInt(item, 2)));
    return sizes;
  }

  private getSums(arr: string[]): number[] {
    const sums: number[] = [];
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr[i].length; j++) {
        sums[j] = i === 0 ? 0 : sums[j];
        sums[j] += Number.parseInt(arr[i].charAt(j));
      }
    }
    return sums;
  }
}
