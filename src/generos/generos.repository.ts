import { PrismaClient } from "@prisma/client";
import type { CreateGeneros } from "./create-generos.dto.js";

const prisma = new PrismaClient();

export class GenerosRepository {
    async findAll() {
        return await prisma.generos.findMany();
    }
    async findById(id: number) {
        return await prisma.generos.findUnique({ where: { id } });
    }
    async create(data: CreateGeneros) {
        return await prisma.generos.create({ data });
    }
}
