export default class Toothpick {
  private selected: boolean;
  private disabled: boolean;

  constructor() {
    this.selected = false;
    this.disabled = false;
  }

  isSelected(): boolean {
    return this.selected;
  }

  select(): void {
    this.selected = true;
  }

  unselect(): void {
    this.selected = false;
  }

  toggleSelected(): void {
    this.selected = !this.selected;
  }

  isEnabled(): boolean {
    return !this.disabled;
  }

  isDisabled(): boolean {
    return this.disabled;
  }

  enable(): void {
    this.disabled = false;
  }

  disable(): void {
    this.disabled = true;
  }

  toggleDisabled(): void {
    this.disabled = !this.disabled;
  }
}
