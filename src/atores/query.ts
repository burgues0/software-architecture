import { AtoresService } from "./atores.service.js";
import type { Atores } from "@prisma/client";

const atoresService = new AtoresService();

export const atoresQueryResolvers = {
    Query: {
        ator: async (args: { id: number }) => {
            return await atoresService.getAtorById(args.id);
        },
        atores: async () => {
            return await atoresService.getAtores();
        }
    }
};
