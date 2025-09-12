import { Filme } from '../types/entities';
import { v4 as uuidv4 } from 'uuid';

export class FilmesDatasource {
    private filmes: Filme[] = [
        { id: '1', titulo: 'Vingadores: Ultimato', anoLancamento: 2019, generoId: '1', atorIds: ['1', '2', '3'] },
        { id: '2', titulo: 'Forrest Gump', anoLancamento: 1994, generoId: '3', atorIds: ['4'] },
        { id: '3', titulo: 'O Lobo de Wall Street', anoLancamento: 2013, generoId: '3', atorIds: ['5'] }
    ];

    async listarTodos(): Promise<Filme[]> {
        return [...this.filmes];
    }

    async obterPorId(id: string): Promise<Filme | null> {
        const filme = this.filmes.find(f => f.id === id);
        return filme || null;
    }

    async criar(titulo: string, anoLancamento: number, generoId: string): Promise<Filme> {
        const novoFilme: Filme = {
            id: uuidv4(),
            titulo,
            anoLancamento,
            generoId,
            atorIds: []
        };
        this.filmes.push(novoFilme);
        return novoFilme;
    }

    async atualizar(id: string, titulo: string, anoLancamento: number, generoId: string): Promise<Filme | null> {
        const index = this.filmes.findIndex(f => f.id === id);
        if (index === -1) return null;
        
        this.filmes[index] = { 
            ...this.filmes[index]!,
            titulo, 
            anoLancamento, 
            generoId 
        };
        return this.filmes[index]!;
    }

    async deletar(id: string): Promise<boolean> {
        const index = this.filmes.findIndex(f => f.id === id);
        if (index === -1) return false;
        
        this.filmes.splice(index, 1);
        return true;
    }

    async adicionarAtor(filmeId: string, atorId: string): Promise<boolean> {
        const filme = this.filmes.find(f => f.id === filmeId);
        if (!filme) return false;
        
        if (!filme.atorIds.includes(atorId)) {
            filme.atorIds.push(atorId);
        }
        return true;
    }

    async removerAtor(filmeId: string, atorId: string): Promise<boolean> {
        const filme = this.filmes.find(f => f.id === filmeId);
        if (!filme) return false;
        
        const index = filme.atorIds.indexOf(atorId);
        if (index > -1) {
            filme.atorIds.splice(index, 1);
        }
        return true;
    }
}