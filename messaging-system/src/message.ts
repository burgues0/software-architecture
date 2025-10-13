export interface MessageInterface {
  getContent(): string;
}

export class BasicMessage implements MessageInterface {
  constructor(private content: string) {}

  getContent(): string {
    return this.content;
  }
}