import { Command } from './commands/Command';

export class CommandInvoker {
  private history: Command[] = [];

  executeCommand(command: Command): void {
    command.execute();
    this.history.push(command);
  }

  undo(): boolean {
    const command = this.history.pop();
    if (command) {
      command.undo();
      return true;
    }
    return false;
  }
}