import { Package } from '../Package';

export interface PackageState {
  getName(): string;
  update(pkg: Package): void;
}