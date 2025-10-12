import { Package } from './Package';

export class PackageManager {
  private packages: Map<string, Package> = new Map();

  registerPackage(code: string): boolean {
    if (this.packages.has(code)) {
      return false; // Pacote já existe
    }
    
    const pkg = new Package(code);
    this.packages.set(code, pkg);
    return true;
  }

  getPackageStatus(code: string): string | null {
    const pkg = this.packages.get(code);
    return pkg ? pkg.getStatus() : null;
  }

  updateAllPackages(): void {
    for (const pkg of this.packages.values()) {
      pkg.update();
    }
  }

  getAllPackages(): Package[] {
    return Array.from(this.packages.values());
  }
}