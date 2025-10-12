import { LogEntry } from './LogEntry';
import * as fs from 'fs';
import * as path from 'path';

export interface LogOutputStrategy {
  output(logs: LogEntry[]): void;
}

export class ConsoleOutputStrategy implements LogOutputStrategy {
  output(logs: LogEntry[]): void {
    console.log('\n=== LOGS DO SISTEMA ===');
    if (logs.length === 0) {
      console.log('Nenhum log encontrado.');
      return;
    }
    
    logs.forEach(log => {
      console.log(`${log.id}: ${log.toString()}`);
    });
    console.log(`\nTotal: ${logs.length} logs\n`);
  }
}

export class FileOutputStrategy implements LogOutputStrategy {
  private readonly fileName: string;

  constructor(fileName: string = 'logs.txt') {
    this.fileName = fileName;
  }

  output(logs: LogEntry[]): void {
    const content = logs.map(log => `${log.id}: ${log.toString()}`).join('\n');
    const fullPath = path.join(process.cwd(), this.fileName);
    
    try {
      fs.writeFileSync(fullPath, content);
      console.log(`\nLogs salvos em: ${fullPath}`);
      console.log(`Total: ${logs.length} logs salvos\n`);
    } catch (error) {
      console.error(`Erro ao salvar arquivo: ${error}\n`);
    }
  }
}

export class DailySummaryStrategy implements LogOutputStrategy {
  output(logs: LogEntry[]): void {
    console.log('\n=== RESUMO DIÁRIO ===');
    
    if (logs.length === 0) {
      console.log('Nenhum log encontrado.');
      return;
    }

    const dailyLogs = new Map<string, LogEntry[]>();
    
    logs.forEach(log => {
      const dateKey = log.timestamp.toISOString().split('T')[0];
      if (!dailyLogs.has(dateKey)) {
        dailyLogs.set(dateKey, []);
      }
      dailyLogs.get(dateKey)!.push(log);
    });

    dailyLogs.forEach((dayLogs, date) => {
      console.log(`\n${date}: ${dayLogs.length} logs`);
      dayLogs.forEach(log => {
        const time = log.timestamp.toTimeString().split(' ')[0];
        console.log(`  ${time} - ${log.message}`);
      });
    });
    
    console.log(`\nTotal geral: ${logs.length} logs\n`);
  }
}