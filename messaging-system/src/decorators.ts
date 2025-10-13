import { MessageInterface } from './message';

export abstract class MessageDecorator implements MessageInterface {
  constructor(protected message: MessageInterface) {}

  abstract getContent(): string;
}

export class TimestampDecorator extends MessageDecorator {
  getContent(): string {
    const now = new Date();
    const timestamp = now.toLocaleTimeString('pt-BR', { 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit' 
    });
    return `[${timestamp}] ${this.message.getContent()}`;
  }
}

export class UppercaseDecorator extends MessageDecorator {
  getContent(): string {
    return this.message.getContent().toUpperCase();
  }
}

export class PriorityDecorator extends MessageDecorator {
  getContent(): string {
    return `[PRIORIDADE] ${this.message.getContent()}`;
  }
}