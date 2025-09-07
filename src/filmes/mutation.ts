import { FilmesService } from "./filmes.service.js";
import type { Filmes } from "@prisma/client";
import type { CreateFilmes } from "./create-filmes.dto.js";
import type { UpdateFilmes } from "./update-filmes.dto.js";

const filmesService = new FilmesService();

export const filmesMutationResolvers = {
    Mutation: {
        criarFilme: async (args: CreateFilmes): Promise<Filmes> => {
            return await filmesService.createFilme(args);
        },
        atualizarFilme: async (args: { id: number } & UpdateFilmes): Promise<Filmes> => {
            return await filmesService.updateFilme(args.id, args);
        },
        deletarFilme: async (args: { id: number }): Promise<Filmes> => {
            return await filmesService.deleteFilme(args.id);
        },
        adicionarAtores: async (args: { filmeId: number; atorIds: number[] }): Promise<Filmes | null> => {
            return await filmesService.addAtores(args.filmeId, args.atorIds);
        },
        removerAtores: async (args: { filmeId: number; atorIds: number[] }): Promise<Filmes | null> => {
            return await filmesService.removeAtores(args.filmeId, args.atorIds);
        },
        adicionarGeneros: async (args: { filmeId: number; generoIds: number[] }): Promise<Filmes | null> => {
            return await filmesService.addGeneros(args.filmeId, args.generoIds);
        }
    }
};