import { GenerosService } from "./generos.service.js";

const generosService = new GenerosService();

export const generosQueryResolvers = {
    Query: {
        genero: async (args: { id: number }) => {
            return await generosService.getGeneroById(args.id);
        },
        generos: async () => {
            return await generosService.getGeneros();
        }
    }
};