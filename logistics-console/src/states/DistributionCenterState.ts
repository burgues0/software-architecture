import { PackageState } from './PackageState';
import { Package } from '../Package';

export class DistributionCenterState implements PackageState {
  getName(): string {
    return 'no centro de distribuição';
  }

  update(pkg: Package): void {}
}