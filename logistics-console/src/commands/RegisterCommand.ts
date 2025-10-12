import { Command } from './Command';
import { PackageManager } from '../PackageManager';

export class RegisterCommand implements Command {
  private packageManager: PackageManager;
  private code: string;

  constructor(packageManager: PackageManager, code: string) {
    this.packageManager = packageManager;
    this.code = code;
  }

  execute(): void {
    if (this.packageManager.registerPackage(this.code)) {
      console.log(`Pacote ${this.code} registrado com sucesso.\n`);
    } else {
      console.log(`Pacote ${this.code} já existe no sistema.\n`);
    }
  }
}