import * as readline from 'readline';
import { PackageManager } from './PackageManager';
import { CommandProcessor } from './CommandProcessor';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const packageManager = new PackageManager();
const commandProcessor = new CommandProcessor(packageManager);

console.log('=== Sistema de Logística ===');
console.log('Comandos: registrar <codigo>, status <codigo>, sair');
console.log('Os pacotes evoluem automaticamente a cada comando.\n');

function processInput(input: string): void {
  const shouldContinue = commandProcessor.processInput(input);
  
  if (shouldContinue) {
    rl.question('> ', processInput);
  } else {
    rl.close();
  }
}

rl.question('> ', processInput);