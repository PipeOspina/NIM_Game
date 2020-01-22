import Toothpick from "./Toothpick";

export default class BoardRow {
  private size: number;
  private toothpicks: Toothpick[];

  constructor(size?: number) {
    this.toothpicks = [];
    if (size) this.size = size <= 24 ? size : 24;
    else this.size = Math.floor(Math.random() * 24) + 1;
    for (let i = 0; i < this.size; i++) this.toothpicks.push(new Toothpick());
  }

  getSize(): number {
    return this.size;
  }

  getToothpicks(): Toothpick[] {
    return this.toothpicks;
  }

  getEnabledToothpicks(): Toothpick[] {
    let enabled: Toothpick[] = [];
    this.toothpicks.forEach((toothpick: Toothpick) => {
      toothpick.isEnabled() ? enabled.push(toothpick) : 0;
    });
    return enabled;
  }

  setToothpicks(toothpicks: Toothpick[]): void {
    this.toothpicks = toothpicks;
    this.size = toothpicks.length;
  }
}
