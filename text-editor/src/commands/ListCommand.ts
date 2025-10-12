import { Command } from './Command';
import { TextEditor } from '../TextEditor';

export class ListCommand implements Command {
  private editor: TextEditor;

  constructor(editor: TextEditor) {
    this.editor = editor;
  }

  execute(): void {
    const text = this.editor.getText();
    if (text.trim()) {
      console.log('\n--- Texto atual ---');
      console.log(text);
      console.log('--- Fim ---\n');
    } else {
      console.log('Nenhum texto escrito ainda.\n');
    }
  }

  undo(): void {
    // ListCommand não precisa ser desfeito
  }
}