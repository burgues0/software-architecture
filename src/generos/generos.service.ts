import { GenerosDatasource } from './generos.datasource';
import { Genero } from '../types/entities';

export class GenerosService {
    private generosDatasource: GenerosDatasource;

    constructor() {
        this.generosDatasource = new GenerosDatasource();
    }

    async listarTodos(): Promise<Genero[]> {
        return this.generosDatasource.listarTodos();
    }

    async obterPorId(id: string): Promise<Genero | null> {
        return this.generosDatasource.obterPorId(id);
    }

    async criar(nome: string): Promise<Genero> {
        return this.generosDatasource.criar(nome);
    }

    async atualizar(id: string, nome: string): Promise<Genero | null> {
        return this.generosDatasource.atualizar(id, nome);
    }

    async deletar(id: string): Promise<boolean> {
        return this.generosDatasource.deletar(id);
    }
}
