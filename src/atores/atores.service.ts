import { AtoresRepository } from "./atores.repository.js";
import { ValidationService } from "../lib/validation.service.js";
import type { CreateAtores } from "./create-atores.dto.js";
import type { UpdateAtores } from "./update-atores.dto.js";

export class AtoresService {
    private atoresRepository: AtoresRepository;
    constructor() { this.atoresRepository = new AtoresRepository(); }

    async getAtores(){
        try {
            return await this.atoresRepository.findAll();
        } catch (error) {
            throw new Error(`Erro em buscar todos os atores: ${error}`);
        }
    }

    async getAtorById(id: number){
        try {
            const ator = await this.atoresRepository.findById(id);
            return ValidationService.validateExists(ator, "Ator", id);
        } catch (error) {
            throw new Error(`Erro ao buscar o ator especificado: ${error}`);
        }
    }

    async createAtor(data: CreateAtores){
        try {
            ValidationService.validateRequiredField(data.nome, "Nome");
            ValidationService.validateRequiredField(data.nacionalidade, "Nacionalidade");
            return await this.atoresRepository.create(data);
        } catch (error) {
            throw new Error(`Erro ao criar ator: ${error}`);
        }
    }

    async updateAtor(id: number, data: UpdateAtores){
        try {
            ValidationService.validateNonEmptyString(data.nome, "Nome");
            ValidationService.validateNonEmptyString(data.nacionalidade, "Nacionalidade");
            return await this.atoresRepository.update(id, data);
        } catch (error) {
            throw new Error(`Erro ao atualizar ator: ${error}`)
        }
    }

    async deleteAtor(id: number){
        try {
            return await this.atoresRepository.delete(id)
        } catch (error) {
            throw new Error(`Erro ao deletar ator: ${error}`)
        }
    }
}