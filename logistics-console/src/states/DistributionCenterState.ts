import { PackageState } from './PackageState';
import { DeliveredState } from './DeliveredState';
import { Package } from '../Package';

export class DistributionCenterState implements PackageState {
  private updateCount: number = 0;

  getName(): string {
    return 'no centro de distribuição';
  }

  update(pkg: Package): void {
    this.updateCount++;
    if (this.updateCount >= 1) {
      pkg.setState(new DeliveredState());
    }
  }
}