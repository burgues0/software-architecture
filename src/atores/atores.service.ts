import { AtoresRepository } from "./atores.repository.js";
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
            if (!ator) throw new Error(`Ator com o ID ${id} não encontrado.`);
            return ator;
        } catch (error) {
            throw new Error(`Erro ao buscar o ator especificado: ${error}`);
        }
    }

    async createAtor(data: CreateAtores){
        try {
            if (!data.nome) throw new Error(`Nome não foi informado.`);
            if (!data.nacionalidade) throw new Error(`Nacionalidade não foi informada.`);
            return await this.atoresRepository.create(data);
        } catch (error) {
            throw new Error(`Erro ao criar ator: ${error}`);
        }
    }

    async updateAtor(id: number, data: UpdateAtores){
        try {
            if (data.nome?.trim().length === 0) throw new Error(`Nome não pode ser vazio.`);
            if (data.nacionalidade?.trim().length === 0) throw new Error(`Nacionalidade não pode ser vazio.`);
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