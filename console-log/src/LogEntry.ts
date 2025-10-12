export interface LogEntry {
  id: number;
  message: string;
  timestamp: Date;
}

export class LogEntryImpl implements LogEntry {
  public readonly id: number;
  public readonly message: string;
  public readonly timestamp: Date;

  constructor(id: number, message: string) {
    this.id = id;
    this.message = message;
    this.timestamp = new Date();
  }

  toString(): string {
    return `[${this.timestamp.toISOString()}] ${this.message}`;
  }
}