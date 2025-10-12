import { User, Video, VideoLevel } from './models';

export interface VideoInterface {
  play(): string;
}

export class VideoProxy implements VideoInterface {
  private video: Video | null = null;

  constructor(
    private readonly title: string,
    private readonly level: VideoLevel,
    private readonly user: User
  ) {}

  play(): string {
    if (!this.user.canAccess(this.level)) {
      return `Acesso negado: O vídeo "${this.title}" requer assinatura premium`;
    }

    if (!this.video) {
      this.video = new Video(this.title, this.level);
      console.log(`Acesso permitido: Carregando vídeo "${this.title}"`);
    }

    return this.video.play();
  }
}