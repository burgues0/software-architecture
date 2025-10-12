import { PackageState } from './states/PackageState';
import { RegisteredState } from './states/RegisteredState';

export class Package {
  private code: string;
  private state: PackageState;

  constructor(code: string) {
    this.code = code;
    this.state = new RegisteredState();
  }

  getCode(): string {
    return this.code;
  }

  getStatus(): string {
    return this.state.getName();
  }

  setState(state: PackageState): void {
    this.state = state;
  }

  update(): void {
    this.state.update(this);
  }
}