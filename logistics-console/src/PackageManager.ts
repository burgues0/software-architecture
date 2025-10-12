import { Package } from './Package';

export class PackageManager {
  private packages: Map<string, Package> = new Map();
  private globalTime: number = 0;

  registerPackage(code: string): boolean {
    if (this.packages.has(code)) {
      return false;
    }
    
    const pkg = new Package(code, this.globalTime);
    this.packages.set(code, pkg);
    return true;
  }

  getPackageStatus(code: string): string | null {
    const pkg = this.packages.get(code);
    return pkg ? pkg.getStatus() : null;
  }

  updateAllPackages(): void {
    this.globalTime++;
    for (const pkg of this.packages.values()) {
      const oldStatus = pkg.getStatus();
      pkg.updateToGlobalTime(this.globalTime);
      const newStatus = pkg.getStatus();
      if (oldStatus !== newStatus) {
        console.log(`Pacote ${pkg.getCode()}: ${oldStatus} → ${newStatus}`);
      }
    }
  }

  getAllPackages(): Package[] {
    return Array.from(this.packages.values());
  }
}