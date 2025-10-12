import { PackageState } from './states/PackageState';
import { RegisteredState } from './states/RegisteredState';
import { InTransitState } from './states/InTransitState';
import { DistributionCenterState } from './states/DistributionCenterState';
import { DeliveredState } from './states/DeliveredState';

export class Package {
  private code: string;
  private state: PackageState;
  private totalUpdates: number = 0;
  private createdAt: number;

  constructor(code: string, globalTime: number) {
    this.code = code;
    this.state = new RegisteredState();
    this.createdAt = globalTime;
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

  updateToGlobalTime(globalTime: number): void {
    const targetUpdates = Math.max(0, globalTime - this.createdAt);
    
    while (this.totalUpdates < targetUpdates) {
      this.performSingleUpdate();
      this.totalUpdates++;
    }
  }

  private performSingleUpdate(): void {
    const currentStateName = this.state.getName();
    
    if (currentStateName === 'registrado') {
      this.setState(new InTransitState());
    } else if (currentStateName === 'em trânsito') {
      if (this.totalUpdates >= 2) {
        this.setState(new DistributionCenterState());
      }
    } else if (currentStateName === 'no centro de distribuição') {
      if (this.totalUpdates >= 3) {
        this.setState(new DeliveredState());
      }
    }
  }
}