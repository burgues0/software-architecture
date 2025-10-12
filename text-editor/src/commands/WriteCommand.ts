import { Command } from './Command';
import { TextEditor } from '../TextEditor';

export class WriteCommand implements Command {
  private text: string;
  private editor: TextEditor;

  constructor(editor: TextEditor, text: string) {
    this.editor = editor;
    this.text = text;
  }

  execute(): void {
    this.editor.addLine(this.text);
  }

  undo(): void {
    this.editor.removeLine();
  }
}