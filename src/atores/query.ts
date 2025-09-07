import { AtoresService } from "./atores.service.js";
import type { Atores } from "@prisma/client";

const atoresService = new AtoresService();

interface AtorByIdArgs {
    id: string;
}

export const queryResolvers = {
    Query: {
        ator: async (args: AtorByIdArgs): Promise<Atores> => {
            const id = parseInt(args.id);
            return await atoresService.getAtorById(id);
        },
        atores: async (): Promise<Atores[]> => {
            return await atoresService.getAtores();
        }
    }
};
