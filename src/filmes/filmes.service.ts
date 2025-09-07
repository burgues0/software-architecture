import { FilmesRepository } from "./filmes.repository.js";
import { ValidationService } from "../lib/validation.service.js";
import type { CreateFilmes } from "./create-filmes.dto.js";
import type { UpdateFilmes } from "./update-filmes.dto.js";

export class FilmesService {
    private filmesRepository: FilmesRepository;
    constructor() { this.filmesRepository = new FilmesRepository(); }

    async getFilmes() {
        try {
            return await this.filmesRepository.findAll();
        } catch (error) {
            throw new Error(`Erro ao buscar filmes: ${error}`);
        }
    }

    async getFilmeById(id: number) {
        try {
            const filme = await this.filmesRepository.findById(id);
            return ValidationService.validateExists(filme, "Filme", id);
        } catch (error) {
            throw new Error(`Erro ao buscar filme: ${error}`);
        }
    }

    async createFilme(data: CreateFilmes) {
        try {
            ValidationService.validateRequiredField(data.titulo, "Título");
            ValidationService.validateRequiredField(data.ano_lancamento, "Ano de lançamento");
            return await this.filmesRepository.create(data);
        } catch (error) {
            throw new Error(`Erro ao criar filme: ${error}`);
        }
    }

    async updateFilme(id: number, data: UpdateFilmes) {
        try {
            ValidationService.validateNonEmptyString(data.titulo, "Título");
            ValidationService.validateYearRange(data.ano_lancamento);
            return await this.filmesRepository.update(id, data);
        } catch (error) {
            throw new Error(`Erro ao atualizar filme: ${error}`);
        }
    }

    async deleteFilme(id: number) {
        try {
            return await this.filmesRepository.delete(id);
        } catch (error) {
            throw new Error(`Erro ao deletar filme: ${error}`);
        }
    }

    async addAtores(filmeId: number, atorIds: number[]) {
        try {
            const filme = await this.filmesRepository.findById(filmeId);
            ValidationService.validateExists(filme, "Filme", filmeId);
            ValidationService.validateNonEmptyArray(atorIds, "ID de ator");
            return await this.filmesRepository.addAtores(filmeId, atorIds);
        } catch (error) {
            throw new Error(`Erro ao adicionar atores ao filme: ${error}`);
        }
    }

    async removeAtores(filmeId: number, atorIds: number[]) {
        try {
            const filme = await this.filmesRepository.findById(filmeId);
            ValidationService.validateExists(filme, "Filme", filmeId);
            ValidationService.validateNonEmptyArray(atorIds, "ID de ator");
            return await this.filmesRepository.removeAtores(filmeId, atorIds);
        } catch (error) {
            throw new Error(`Erro ao remover atores do filme: ${error}`);
        }
    }

    async addGeneros(filmeId: number, generoIds: number[]) {
        try {
            const filme = await this.filmesRepository.findById(filmeId);
            ValidationService.validateExists(filme, "Filme", filmeId);
            ValidationService.validateNonEmptyArray(generoIds, "ID de gênero");
            return await this.filmesRepository.addGeneros(filmeId, generoIds);
        } catch (error) {
            throw new Error(`Erro ao adicionar gênero ao filme: ${error}`);
        }
    }
}
