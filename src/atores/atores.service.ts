import { AtoresDatasource } from './atores.datasource';
import { Ator } from '../types/entities';

export class AtoresService {
  private atoresDatasource: AtoresDatasource;

  constructor() {
    this.atoresDatasource = new AtoresDatasource();
  }

  async listarTodos(): Promise<Ator[]> {
    return this.atoresDatasource.listarTodos();
  }

  async obterPorId(id: string): Promise<Ator | null> {
    return this.atoresDatasource.obterPorId(id);
  }

  async obterPorIds(ids: string[]): Promise<Ator[]> {
    return this.atoresDatasource.obterPorIds(ids);
  }

  async criar(nome: string, dataNascimento: string): Promise<Ator> {
    return this.atoresDatasource.criar(nome, dataNascimento);
  }

  async atualizar(id: string, nome: string, dataNascimento: string): Promise<Ator | null> {
    return this.atoresDatasource.atualizar(id, nome, dataNascimento);
  }

  async deletar(id: string): Promise<boolean> {
    return this.atoresDatasource.deletar(id);
  }
}
