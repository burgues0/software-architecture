export interface HateoasLink {
    rel: string;
    href: string;
    method: string;
}
  
export interface HateoasResponse<T> {
    statusCode: number;
    message?: string;
    data?: T;
    _links: HateoasLink[];
}
  
export class HateoasHelper {
    private static baseUrl = 'http://localhost:3000';

    static createActorLinks(actorId: number): HateoasLink[] {
        return [
            {
                rel: 'self',
                href: `${this.baseUrl}/actors/${actorId}`,
                method: 'GET',
            },
            {
                rel: 'update',
                href: `${this.baseUrl}/actors/${actorId}`,
                method: 'PUT',
            },
            {
                rel: 'delete',
                href: `${this.baseUrl}/actors/${actorId}`,
                method: 'DELETE',
            },
            {
                rel: 'all-actors',
                href: `${this.baseUrl}/actors`,
                method: 'GET',
            },
        ];
    }
    
    static createMovieLinks(movieId: number): HateoasLink[] {
        return [
            {
                rel: 'self',
                href: `${this.baseUrl}/movies/${movieId}`,
                method: 'GET',
            },
            {
                rel: 'update',
                href: `${this.baseUrl}/movies/${movieId}`,
                method: 'PUT',
            },
            {
                rel: 'delete',
                href: `${this.baseUrl}/movies/${movieId}`,
                method: 'DELETE',
            },
            {
                rel: 'actors',
                href: `${this.baseUrl}/movies/${movieId}/actors`,
                method: 'GET',
            },
            {
                rel: 'add-actor',
                href: `${this.baseUrl}/movies/${movieId}/actors`,
                method: 'POST',
            },
            {
                rel: 'all-movies',
                href: `${this.baseUrl}/movies`,
                method: 'GET',
            },
        ];
    }

    static createActorsCollectionLinks(): HateoasLink[] {
        return [
            {
                rel: 'self',
                href: `${this.baseUrl}/actors`,
                method: 'GET',
            },
            {
                rel: 'create',
                href: `${this.baseUrl}/actors`,
                method: 'POST',
            },
        ];
    }

    static createMoviesCollectionLinks(): HateoasLink[] {
        return [
            {
                rel: 'self',
                href: `${this.baseUrl}/movies`,
                method: 'GET',
            },
            {
                rel: 'create',
                href: `${this.baseUrl}/movies`,
                method: 'POST',
            },
        ];
    }

    static createMovieActorsLinks(movieId: number): HateoasLink[] {
        return [
            {
                rel: 'self',
                href: `${this.baseUrl}/movies/${movieId}/actors`,
                method: 'GET',
            },
            {
                rel: 'movie',
                href: `${this.baseUrl}/movies/${movieId}`,
                method: 'GET',
            },
            {
                rel: 'add-actor',
                href: `${this.baseUrl}/movies/${movieId}/actors`,
                method: 'POST',
            },
        ];
    }
}