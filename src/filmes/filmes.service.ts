import { FilmesRepository } from "./filmes.repository.js";
import type { CreateFilmes } from "./create-filmes.dto.js";
import type { UpdateFilmes } from "./update-filmes.dto.js";

export class FilmesService {
    private filmesRepository: FilmesRepository;
    constructor() { this.filmesRepository = new FilmesRepository(); }

    async getFilmes() {
        try {
            return await this.filmesRepository.findAll();
        } catch (error) {
            throw new Error("Erro ao buscar filmes");
        }
    }

    async getFilmeById(id: number) {
        try {
            const filme = await this.filmesRepository.findById(id);
            if (!filme) throw new Error(`Filme com o ID ${id} não encontrado.`);
            return filme;
        } catch (error) {
            throw new Error("Erro ao buscar filme");
        }
    }

    async createFilme(data: CreateFilmes) {
        try {
            if (!data.titulo) throw new Error("Título não foi informado.");
            if (!data.ano_lancamento) throw new Error("Ano de lançamento não foi informado.");
            return await this.filmesRepository.create(data);
        } catch (error) {
            throw new Error("Erro ao criar filme");
        }
    }

    async updateFilme(id: number, data: UpdateFilmes) {
        try {
            if (data.titulo?.trim().length === 0) throw new Error("Título não pode ser vazio.");
            if (data.ano_lancamento !== undefined && (data.ano_lancamento < 1888 || data.ano_lancamento > new Date().getFullYear() + 1)) {
                throw new Error("Ano de lançamento inválido.");
            }
            return await this.filmesRepository.update(id, data);
        } catch (error) {
            throw new Error("Erro ao atualizar filme");
        }
    }

    async deleteFilme(id: number) {
        try {
            return await this.filmesRepository.delete(id);
        } catch (error) {
            throw new Error("Erro ao deletar filme");
        }
    }

    async addAtores(filmeId: number, atorIds: number[]) {
        try {
            const filme = await this.filmesRepository.findById(filmeId);
            if (!filme) throw new Error(`Filme com o ID ${filmeId} não encontrado.`);
            if (atorIds.length === 0) throw new Error("Nenhum ID de ator foi fornecido.");
            return await this.filmesRepository.addAtores(filmeId, atorIds);
        } catch (error) {
            throw new Error("Erro ao adicionar atores ao filme");
        }
    }

    async removeAtores(filmeId: number, atorIds: number[]) {
        try {
            const filme = await this.filmesRepository.findById(filmeId);
            if (!filme) throw new Error(`Filme com o ID ${filmeId} não encontrado.`);
            if (atorIds.length === 0) throw new Error("Nenhum ID de ator foi fornecido.");
            return await this.filmesRepository.removeAtores(filmeId, atorIds);
        } catch (error) {
            throw new Error("Erro ao remover atores do filme");
        }
    }

    async addGeneros(filmeId: number, generoIds: number[]) {
        try {
            const filme = await this.filmesRepository.findById(filmeId);
            if (!filme) throw new Error(`Filme com o ID ${filmeId} não encontrado.`);
            if (!generoIds || generoIds.length === 0) throw new Error("Nenhum ID de gênero foi fornecido.");
            return await this.filmesRepository.addGeneros(filmeId, generoIds);
        } catch (error) {
            throw new Error("Erro ao adicionar gênero ao filme");
        }
    }
}
