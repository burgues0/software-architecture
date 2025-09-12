import { FilmesDatasource } from './filmes.datasource';
import { AtoresService } from '../atores/atores.service';
import { Filme, Ator } from '../types/entities';

export class FilmesService {
  private filmesDatasource: FilmesDatasource;
  private atoresService: AtoresService;

  constructor() {
    this.filmesDatasource = new FilmesDatasource();
    this.atoresService = new AtoresService();
  }

  async listarTodos(): Promise<Filme[]> {
    return this.filmesDatasource.listarTodos();
  }

  async obterPorId(id: string): Promise<Filme | null> {
    return this.filmesDatasource.obterPorId(id);
  }

  async criar(titulo: string, anoLancamento: number, generoId: string): Promise<Filme> {
    return this.filmesDatasource.criar(titulo, anoLancamento, generoId);
  }

  async atualizar(id: string, titulo: string, anoLancamento: number, generoId: string): Promise<Filme | null> {
    return this.filmesDatasource.atualizar(id, titulo, anoLancamento, generoId);
  }

  async deletar(id: string): Promise<boolean> {
    return this.filmesDatasource.deletar(id);
  }

  async listarAtoresDoFilme(filmeId: string): Promise<Ator[]> {
    const filme = await this.filmesDatasource.obterPorId(filmeId);
    if (!filme) return [];
    return this.atoresService.obterPorIds(filme.atorIds);
  }

  async adicionarAtor(filmeId: string, atorId: string): Promise<boolean> {
    const ator = await this.atoresService.obterPorId(atorId);
    if (!ator) return false;
    return this.filmesDatasource.adicionarAtor(filmeId, atorId);
  }

  async removerAtor(filmeId: string, atorId: string): Promise<boolean> {
    return this.filmesDatasource.removerAtor(filmeId, atorId);
  }
}
