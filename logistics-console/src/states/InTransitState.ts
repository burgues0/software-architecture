import { PackageState } from './PackageState';
import { Package } from '../Package';

export class InTransitState implements PackageState {
  getName(): string {
    return 'em trânsito';
  }

  update(pkg: Package): void {}
}