import { prisma } from "../lib/prisma.js";
import type { CreateAtores } from "./create-atores.dto.js";
import type { UpdateAtores } from "./update-atores.dto.js";

export class AtoresRepository {
    async findAll() {
        return await prisma.atores.findMany({
            include: {
                filmes: true
            }
        });
    }
    async findById(id: number) {
        return await prisma.atores.findUnique({ 
            where: { id },
            include: {
                filmes: true
            }
        });
    }
    async create(data: CreateAtores) {
        return await prisma.atores.create({ 
            data,
            include: {
                filmes: true
            }
        });
    }
    async update(id: number, data: UpdateAtores) {
        return await prisma.atores.update({ 
            where: { id }, 
            data,
            include: {
                filmes: true
            }
        });
    }
    async delete(id: number) {
        return await prisma.atores.delete({ where: { id } });
    }
}