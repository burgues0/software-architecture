import { Ator } from '../types/entities';
import { v4 as uuidv4 } from 'uuid';

export class AtoresDatasource {
    private atores: Ator[] = [
        { id: '1', nome: 'Robert Downey Jr.', dataNascimento: '1965-04-04' },
        { id: '2', nome: 'Scarlett Johansson', dataNascimento: '1984-11-22' },
        { id: '3', nome: 'Chris Evans', dataNascimento: '1981-06-13' },
        { id: '4', nome: 'Tom Hanks', dataNascimento: '1956-07-09' },
        { id: '5', nome: 'Leonardo DiCaprio', dataNascimento: '1974-11-11' }
    ];

    async listarTodos(): Promise<Ator[]> {
        return [...this.atores];
    }

    async obterPorId(id: string): Promise<Ator | null> {
        const ator = this.atores.find(a => a.id === id);
        return ator || null;
    }

    async obterPorIds(ids: string[]): Promise<Ator[]> {
        return this.atores.filter(ator => ids.includes(ator.id));
    }

    async criar(nome: string, dataNascimento: string): Promise<Ator> {
        const novoAtor: Ator = {
            id: uuidv4(),
            nome,
            dataNascimento
        };
        this.atores.push(novoAtor);
        return novoAtor;
    }

    async atualizar(id: string, nome: string, dataNascimento: string): Promise<Ator | null> {
        const index = this.atores.findIndex(a => a.id === id);
        if (index === -1) return null;
        
        this.atores[index] = { id: this.atores[index]!.id, nome, dataNascimento };
        return this.atores[index]!;
    }

    async deletar(id: string): Promise<boolean> {
        const index = this.atores.findIndex(a => a.id === id);
        if (index === -1) return false;
        
        this.atores.splice(index, 1);
        return true;
    }
}