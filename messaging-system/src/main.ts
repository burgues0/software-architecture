import { createInterface, Interface } from 'readline';
import { BasicMessage, MessageInterface } from './message';
import { TimestampDecorator, UppercaseDecorator, PriorityDecorator } from './decorators';

class MessagingApp {
  private rl: Interface;

  constructor() {
    this.rl = createInterface({
      input: process.stdin,
      output: process.stdout
    });
  }

  start(): void {
    console.log("=== Sistema de Mensagens ===");
    console.log("Comandos disponíveis:");
    console.log("- enviar <mensagem>");
    console.log("- sair");
    console.log("=============================\n");
    
    this.promptUser();
  }

  private promptUser(): void {
    this.rl.question("> ", (input: string) => {
      const command = input.trim();
      
      if (command === "sair") {
        console.log("Encerrando sistema...");
        this.rl.close();
        return;
      }

      if (command.startsWith("enviar ")) {
        const messageText = command.substring(7).trim();
        if (messageText) {
          this.handleMessage(messageText);
        } else {
          console.log("Por favor, informe uma mensagem para enviar");
          this.promptUser();
        }
      } else {
        console.log("Comando inválido. Use: enviar <mensagem> ou sair");
        this.promptUser();
      }
    });
  }

  private handleMessage(messageText: string): void {
    this.rl.question("Aplicar timestamp? (s/n) ", (timestampAnswer: string) => {
      this.rl.question("Transformar em maiúsculas? (s/n) ", (uppercaseAnswer: string) => {
        this.rl.question("Adicionar prioridade? (s/n) ", (priorityAnswer: string) => {
          let message: MessageInterface = new BasicMessage(messageText);

          if (uppercaseAnswer.toLowerCase() === 's') {
            message = new UppercaseDecorator(message);
          }

          if (timestampAnswer.toLowerCase() === 's') {
            message = new TimestampDecorator(message);
          }

          if (priorityAnswer.toLowerCase() === 's') {
            message = new PriorityDecorator(message);
          }

          console.log(`Mensagem final: ${message.getContent()}\n`);
          this.promptUser();
        });
      });
    });
  }
}

const app = new MessagingApp();
app.start();