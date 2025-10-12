export class TextEditor {
  private lines: string[] = [];

  addLine(text: string): void {
    this.lines.push(text);
  }

  removeLine(): string | undefined {
    return this.lines.pop();
  }

  getLines(): string[] {
    return [...this.lines];
  }

  getText(): string {
    return this.lines.join('\n');
  }
}