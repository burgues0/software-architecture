import { User, UserType, VideoLevel } from './models';
import { VideoProxy } from './video-proxy';

export class AuthSystem {
  private readonly users: Map<string, User> = new Map();
  private currentUser: User | null = null;
  
  constructor() {
    this.users.set("joao", new User("joao", UserType.NORMAL));
    this.users.set("maria", new User("maria", UserType.PREMIUM));
    this.users.set("pedro", new User("pedro", UserType.NORMAL));
    this.users.set("ana", new User("ana", UserType.PREMIUM));
  }

  login(username: string): boolean {
    const user = this.users.get(username.toLowerCase());
    if (user) {
      this.currentUser = user;
      return true;
    }
    return false;
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }

  logout(): void {
    this.currentUser = null;
  }
}

export class VideoService {
  private readonly videos: Map<string, VideoLevel> = new Map();

  constructor() {
    this.videos.set("introducao-programacao", VideoLevel.FREE);
    this.videos.set("algoritmos-avancados", VideoLevel.PREMIUM);
    this.videos.set("programacao-web", VideoLevel.FREE);
    this.videos.set("machine-learning", VideoLevel.PREMIUM);
    this.videos.set("banco-de-dados", VideoLevel.FREE);
    this.videos.set("arquitetura-software", VideoLevel.PREMIUM);
  }

  watchVideo(videoName: string, user: User): string {
    const videoLevel = this.videos.get(videoName.toLowerCase());
    
    if (!videoLevel) {
      return `Vídeo "${videoName}" não encontrado`;
    }

    const videoProxy = new VideoProxy(videoName, videoLevel, user);
    return videoProxy.play();
  }

  listVideos(): string[] {
    return Array.from(this.videos.keys());
  }
}