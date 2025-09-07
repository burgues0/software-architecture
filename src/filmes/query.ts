import { FilmesService } from "./filmes.service.js";

const filmesService = new FilmesService();

export const filmesQueryResolvers = {
    Query: {
        filme: async (args: { id: number }) => {
            return await filmesService.getFilmeById(args.id);
        },
        filmes: async () => {
            return await filmesService.getFilmes();
        }
    }
};
