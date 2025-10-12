import { Command } from './commands/Command';
import { RegisterCommand } from './commands/RegisterCommand';
import { StatusCommand } from './commands/StatusCommand';
import { PackageManager } from './PackageManager';

export class CommandProcessor {
  private packageManager: PackageManager;

  constructor(packageManager: PackageManager) {
    this.packageManager = packageManager;
  }

  processInput(input: string): boolean {
    const trimmedInput = input.trim();

    if (trimmedInput === 'sair') {
      console.log('Até logo!');
      return false;
    }

    this.packageManager.updateAllPackages();

    if (trimmedInput.startsWith('registrar ')) {
      const code = trimmedInput.substring(10).trim();
      if (code.length > 0) {
        const command: Command = new RegisterCommand(this.packageManager, code);
        command.execute();
      } else {
        console.log('Digite um código para o pacote. Exemplo: registrar ABC123\n');
      }
    } else if (trimmedInput.startsWith('status ')) {
      const code = trimmedInput.substring(7).trim();
      if (code.length > 0) {
        const command: Command = new StatusCommand(this.packageManager, code);
        command.execute();
      } else {
        console.log('Digite um código para consultar. Exemplo: status ABC123\n');
      }
    } else {
      console.log('Comando inválido. Use: registrar <codigo>, status <codigo>, sair\n');
    }

    return true;
  }
}