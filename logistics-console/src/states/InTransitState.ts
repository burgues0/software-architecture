import { PackageState } from './PackageState';
import { DistributionCenterState } from './DistributionCenterState';
import { Package } from '../Package';

export class InTransitState implements PackageState {
  private updateCount: number = 0;

  getName(): string {
    return 'em trânsito';
  }

  update(pkg: Package): void {
    this.updateCount++;
    if (this.updateCount >= 2) {
      pkg.setState(new DistributionCenterState());
    }
  }
}