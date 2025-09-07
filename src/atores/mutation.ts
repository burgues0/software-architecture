import { AtoresService } from "./atores.service.js";
import type { Atores } from "@prisma/client";
import type { CreateAtores } from "./create-atores.dto.js";
import type { UpdateAtores } from "./update-atores.dto.js";

const atoresService = new AtoresService();

export const atoresMutationResolvers = {
    Mutation: {
        criarAtor: async (args: { input: CreateAtores }): Promise<Atores> => {
            return await atoresService.createAtor(args.input);
        },
        atualizarAtor: async (args: { id: number; input: UpdateAtores }): Promise<Atores> => {
            return await atoresService.updateAtor(args.id, args.input);
        },
        deletarAtor: async (args: { id: number }): Promise<Atores> => {
            return await atoresService.deleteAtor(args.id);
        }
    }
}