import { PackageState } from './PackageState';
import { InTransitState } from './InTransitState';
import { Package } from '../Package';

export class RegisteredState implements PackageState {
  getName(): string {
    return 'registrado';
  }

  update(pkg: Package): void {
    pkg.setState(new InTransitState());
  }
}