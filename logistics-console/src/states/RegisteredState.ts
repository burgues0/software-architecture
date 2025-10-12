import { PackageState } from './PackageState';
import { Package } from '../Package';

export class RegisteredState implements PackageState {
  getName(): string {
    return 'registrado';
  }

  update(pkg: Package): void {}
}