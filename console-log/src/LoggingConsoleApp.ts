import * as readline from 'readline';
import { LogManager } from './LogManager';
import { 
  ConsoleOutputStrategy, 
  FileOutputStrategy, 
  DailySummaryStrategy 
} from './LogOutputStrategy';

export class LoggingConsoleApp {
  private logManager: LogManager;
  private rl: readline.Interface;
  private isRunning: boolean = true;

  constructor() {
    this.logManager = new LogManager();
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      prompt: '> '
    });
  }

  start(): void {
    console.log('=== Sistema de Registro de Eventos ===');
    console.log('Comandos disponíveis:');
    console.log('  log <mensagem>     - Registra um novo evento');
    console.log('  mostrar            - Lista todos os eventos');
    console.log('  saida console      - Define saída para console');
    console.log('  saida arquivo      - Define saída para arquivo');
    console.log('  saida resumo       - Define saída para resumo diário');
    console.log('  stats              - Mostra estatísticas');
    console.log('  sair               - Encerra o programa');
    console.log('');

    this.rl.prompt();
    this.rl.on('line', (input) => this.handleCommand(input.trim()));
    this.rl.on('close', () => this.shutdown());
  }

  private handleCommand(input: string): void {
    if (!input) {
      this.rl.prompt();
      return;
    }

    const parts = input.split(' ');
    const command = parts[0].toLowerCase();

    try {
      switch (command) {
        case 'log':
          this.handleLogCommand(parts.slice(1).join(' '));
          break;

        case 'mostrar':
          this.handleShowCommand();
          break;

        case 'saida':
          this.handleOutputCommand(parts[1]?.toLowerCase());
          break;

        case 'stats':
          this.handleStatsCommand();
          break;

        case 'sair':
          this.handleExitCommand();
          return;

        default:
          console.log(`Comando desconhecido: ${command}`);
          console.log('Digite um comando válido ou "sair" para encerrar.');
      }
    } catch (error) {
      console.log(`Erro ao executar comando: ${error}`);
    }

    if (this.isRunning) {
      this.rl.prompt();
    }
  }

  private handleLogCommand(message: string): void {
    if (!message || message.trim().length === 0) {
      console.log('Erro: Mensagem não pode estar vazia.');
      console.log('Uso: log <sua mensagem>');
      return;
    }

    this.logManager.addLog(message.trim());
  }

  private handleShowCommand(): void {
    this.logManager.showLogs();
  }

  private handleOutputCommand(type: string): void {
    if (!type) {
      console.log('Erro: Tipo de saída não especificado.');
      console.log('Tipos disponíveis: console, arquivo, resumo');
      return;
    }

    switch (type) {
      case 'console':
        this.logManager.setOutputStrategy(new ConsoleOutputStrategy());
        break;
      case 'arquivo':
        this.logManager.setOutputStrategy(new FileOutputStrategy());
        break;
      case 'resumo':
        this.logManager.setOutputStrategy(new DailySummaryStrategy());
        break;
      default:
        console.log(`Tipo de saída inválido: ${type}`);
        console.log('Tipos disponíveis: console, arquivo, resumo');
    }
  }

  private handleStatsCommand(): void {
    const stats = this.logManager.getStats();
    console.log('\n=== ESTATÍSTICAS ===');
    console.log(`Total de logs: ${stats.total}`);
    console.log(`Logs hoje: ${stats.todayLogs}`);
    console.log('');
  }

  private handleExitCommand(): void {
    console.log('Encerrando sistema...');
    this.shutdown();
  }

  private shutdown(): void {
    this.isRunning = false;
    this.rl.close();
    console.log('Sistema encerrado.');
    process.exit(0);
  }
}