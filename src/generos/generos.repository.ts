import { prisma } from "../lib/prisma.js";
import type { CreateGeneros } from "./create-generos.dto.js";

export class GenerosRepository {
    async findAll() {
        return await prisma.generos.findMany({
            include: {
                filmes: true
            }
        });
    }
    async findById(id: number) {
        return await prisma.generos.findUnique({ 
            where: { id },
            include: {
                filmes: true
            }
        });
    }
    async create(data: CreateGeneros) {
        return await prisma.generos.create({ 
            data,
            include: {
                filmes: true
            }
        });
    }
}
