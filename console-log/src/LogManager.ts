import { LogEntry, LogEntryImpl } from './LogEntry';
import { LogOutputStrategy, ConsoleOutputStrategy } from './LogOutputStrategy';

export class LogManager {
  private logs: LogEntry[] = [];
  private nextId: number = 1;
  private outputStrategy: LogOutputStrategy;

  constructor() {
    this.outputStrategy = new ConsoleOutputStrategy();
  }

  addLog(message: string): void {
    const logEntry = new LogEntryImpl(this.nextId++, message);
    this.logs.push(logEntry);
    console.log(`Log adicionado: ${logEntry.toString()}`);
  }

  getAllLogs(): LogEntry[] {
    return [...this.logs];
  }

  showLogs(): void {
    this.outputStrategy.output(this.getAllLogs());
  }

  setOutputStrategy(strategy: LogOutputStrategy): void {
    this.outputStrategy = strategy;
    console.log('Estratégia de saída alterada.');
  }

  getStats(): { total: number; todayLogs: number } {
    const today = new Date().toISOString().split('T')[0];
    const todayLogs = this.logs.filter(log => 
      log.timestamp.toISOString().split('T')[0] === today
    ).length;

    return {
      total: this.logs.length,
      todayLogs
    };
  }
}