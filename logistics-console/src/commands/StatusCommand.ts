import { Command } from './Command';
import { PackageManager } from '../PackageManager';

export class StatusCommand implements Command {
  private packageManager: PackageManager;
  private code: string;

  constructor(packageManager: PackageManager, code: string) {
    this.packageManager = packageManager;
    this.code = code;
  }

  execute(): void {
    const status = this.packageManager.getPackageStatus(this.code);
    if (status) {
      console.log(`Pacote ${this.code}: ${status}\n`);
    } else {
      console.log(`Pacote ${this.code} não encontrado no sistema.\n`);
    }
  }
}