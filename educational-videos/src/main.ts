import { createInterface, Interface } from 'readline';
import { AuthSystem, VideoService } from './services';

class EducationalVideoApp {
  private authSystem: AuthSystem;
  private videoService: VideoService;
  private rl: Interface;

  constructor() {
    this.authSystem = new AuthSystem();
    this.videoService = new VideoService();
    this.rl = createInterface({
      input: process.stdin,
      output: process.stdout
    });
  }

  start(): void {
    console.log("=== Sistema de Vídeos Educativos ===");
    console.log("Comandos disponíveis:");
    console.log("- entrar <usuario>");
    console.log("- assistir <video>");
    console.log("- sair");
    console.log("=====================================\n");
    
    this.promptUser();
  }

  private promptUser(): void {
    this.rl.question("> ", (input: string) => {
      const command = input.trim().toLowerCase();
      
      if (command === "sair") {
        console.log("Encerrando sistema...");
        this.rl.close();
        return;
      }

      if (command.startsWith("entrar ")) {
        this.handleLogin(command.substring(7).trim());
      } else if (command.startsWith("assistir ")) {
        this.handleWatchVideo(command.substring(9).trim());
      } else {
        console.log("Comando inválido. Use: entrar <usuario>, assistir <video>, ou sair");
      }

      this.promptUser();
    });
  }

  private handleLogin(username: string): void {
    if (!username) {
      console.log("Por favor, informe um nome de usuário");
      return;
    }

    if (this.authSystem.login(username)) {
      const user = this.authSystem.getCurrentUser()!;
      console.log(`Login realizado com sucesso! Bem-vindo, ${user.name} (${user.type})`);
    } else {
      console.log(`Usuário "${username}" não encontrado`);
    }
  }

  private handleWatchVideo(videoName: string): void {
    const currentUser = this.authSystem.getCurrentUser();
    
    if (!currentUser) {
      console.log("Você precisa fazer login primeiro");
      return;
    }

    if (!videoName) {
      console.log("Por favor, informe o nome do vídeo");
      return;
    }

    const result = this.videoService.watchVideo(videoName, currentUser);
    console.log(result);
  }
}

const app = new EducationalVideoApp();
app.start();