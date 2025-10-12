export enum UserType {
  NORMAL = "normal",
  PREMIUM = "premium"
}

export enum VideoLevel {
  FREE = "gratuito",
  PREMIUM = "premium"
}

export class User {
  constructor(
    public readonly name: string,
    public readonly type: UserType
  ) {}

  canAccess(videoLevel: VideoLevel): boolean {
    if (this.type === UserType.PREMIUM) {
      return true;
    }
    return videoLevel === VideoLevel.FREE;
  }
}

export class Video {
  constructor(
    public readonly title: string,
    public readonly level: VideoLevel
  ) {}

  play(): string {
    return `Reproduzindo: ${this.title}`;
  }
}