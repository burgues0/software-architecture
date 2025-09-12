export interface Genero {
    id: string;
    nome: string;
}

export interface Ator {
    id: string;
    nome: string;
    dataNascimento: string;
}

export interface Filme {
    id: string;
    titulo: string;
    anoLancamento: number;
    generoId: string;
    atorIds: string[];
}

export interface FilmeAtor {
    filmeId: string;
    atorId: string;
}
