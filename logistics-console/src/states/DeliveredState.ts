import { PackageState } from './PackageState';
import { Package } from '../Package';

export class DeliveredState implements PackageState {
  getName(): string {
    return 'entregue';
  }

  update(pkg: Package): void {}
}