import * as readline from 'readline';
import { TextEditor } from './TextEditor';
import { CommandInvoker } from './CommandInvoker';
import { WriteCommand } from './commands/WriteCommand';
import { ListCommand } from './commands/ListCommand';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const editor = new TextEditor();
const invoker = new CommandInvoker();

console.log('=== Editor de Texto ===');
console.log('Comandos: escrever <texto>, listar, desfazer, sair\n');

function processInput(input: string): void {
  const trimmedInput = input.trim();

  if (trimmedInput === 'sair') {
    console.log('Até logo!');
    rl.close();
    return;
  }

  if (trimmedInput === 'listar') {
    const listCommand = new ListCommand(editor);
    listCommand.execute();
  } else if (trimmedInput === 'desfazer') {
    if (invoker.undo()) {
      console.log('Última ação desfeita.\n');
    } else {
      console.log('Nada para desfazer.\n');
    }
  } else if (trimmedInput.startsWith('escrever ')) {
    const text = trimmedInput.substring(9);
    if (text.length > 0) {
      const writeCommand = new WriteCommand(editor, text);
      invoker.executeCommand(writeCommand);
      console.log('Linha adicionada.\n');
    } else {
      console.log('Digite algo após "escrever".\n');
    }
  } else {
    console.log('Comando inválido. Use: escrever <texto>, listar, desfazer, sair\n');
  }

  rl.question('> ', processInput);
}

rl.question('> ', processInput);