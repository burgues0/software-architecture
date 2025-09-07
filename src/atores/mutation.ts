import { AtoresService } from "./atores.service.js";
import type { Atores } from "@prisma/client";
import type { CreateAtores } from "./create-atores.dto.js";
import type { UpdateAtores } from "./update-atores.dto.js";

const atoresService = new AtoresService();

export const mutationResolvers = {
    Mutation: {
        criarAtor: async (args: CreateAtores): Promise<Atores> => {
            return await atoresService.createAtor(args);
        },
        atualizarAtor: async (args: { id: number } & UpdateAtores): Promise<Atores> => {
            return await atoresService.updateAtor(args.id, args);
        },
        deletarAtor: async (args: { id: number }): Promise<Atores> => {
            return await atoresService.deleteAtor(args.id);
        }
    }
}