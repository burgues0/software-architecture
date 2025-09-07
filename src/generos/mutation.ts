import { GenerosService } from "./generos.service.js";
import type { CreateGeneros } from "./create-generos.dto.js";

const generosService = new GenerosService();

export const generosMutationResolvers = {
    Mutation: {
        criarGenero: async (parent: any, args: CreateGeneros) => {
            return await generosService.createGenero(args);
        }
    }
};