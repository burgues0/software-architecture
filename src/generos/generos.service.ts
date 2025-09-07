import { GenerosRepository } from "./generos.repository.js";
import { ValidationService } from "../lib/validation.service.js";
import type { CreateGeneros } from "./create-generos.dto.js";

export class GenerosService {
    private generosRepository: GenerosRepository;
    constructor() { this.generosRepository = new GenerosRepository(); }

    async getGeneros(){
        try {
            return await this.generosRepository.findAll();
        } catch (error) {
            throw new Error(`Erro em buscar todos os gêneros: ${error}`);
        }
    }

    async getGeneroById(id: number){
        try {
            const genero = await this.generosRepository.findById(id);
            return ValidationService.validateExists(genero, "Gênero", id);
        } catch (error) {
            throw new Error(`Erro ao buscar o gênero especificado: ${error}`);
        }
    }

    async createGenero(data: CreateGeneros){
        try {
            ValidationService.validateRequiredField(data.nome, "Nome");
            return await this.generosRepository.create(data);
        } catch (error) {
            throw new Error(`Erro ao criar gênero: ${error}`);
        }
    }
}