import { Genero } from '../types/entities';
import { v4 as uuidv4 } from 'uuid';

export class GenerosDatasource {
    private generos: Genero[] = [
        { id: '1', nome: 'Ação' },
        { id: '2', nome: 'Comédia' },
        { id: '3', nome: 'Drama' },
        { id: '4', nome: 'Terror' },
        { id: '5', nome: 'Ficção Científica' }
    ];

    async listarTodos(): Promise<Genero[]> {
        return [...this.generos];
    }

    async obterPorId(id: string): Promise<Genero | null> {
        const genero = this.generos.find(g => g.id === id);
        return genero || null;
    }

    async criar(nome: string): Promise<Genero> {
        const novoGenero: Genero = {
            id: uuidv4(),
            nome
        };
        this.generos.push(novoGenero);
        return novoGenero;
    }

    async atualizar(id: string, nome: string): Promise<Genero | null> {
        const index = this.generos.findIndex(g => g.id === id);
        if (index === -1) return null;
        
        this.generos[index] = { id: this.generos[index]!.id, nome };
        return this.generos[index]!;
    }

    async deletar(id: string): Promise<boolean> {
        const index = this.generos.findIndex(g => g.id === id);
        if (index === -1) return false;
        
        this.generos.splice(index, 1);
        return true;
    }
}