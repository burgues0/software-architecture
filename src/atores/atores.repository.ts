import { PrismaClient } from "@prisma/client";
import type { CreateAtores } from "./create-atores.dto.js";
import type { UpdateAtores } from "./update-atores.dto.js";

const prisma = new PrismaClient();

export class AtoresRepository {
    async findAll() {
        return await prisma.atores.findMany();
    }
    async findById(id: number) {
        return await prisma.atores.findUnique({ where: { id } });
    }
    async create(data: CreateAtores) {
        return await prisma.atores.create({ data });
    }
    async update(id: number, data: UpdateAtores) {
        return await prisma.atores.update({ where: { id }, data });
    }
    async delete(id: number) {
        return await prisma.atores.delete({ where: { id } });
    }
}