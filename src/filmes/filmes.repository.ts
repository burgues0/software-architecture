import { prisma } from "../lib/prisma.js";
import type { CreateFilmes } from "./create-filmes.dto.js";
import type { UpdateFilmes } from "./update-filmes.dto.js";

export class FilmesRepository {
    async findAll(){
        return await prisma.filmes.findMany({
            include: {
                atores: true,
                generos: true
            }
        });
    }
    async findById(id: number){
        return await prisma.filmes.findUnique({ 
            where: { id },
            include: {
                atores: true,
                generos: true
            }
        });
    }
    async create(data: CreateFilmes) {
        return await prisma.filmes.create({ 
            data,
            include: {
                atores: true,
                generos: true
            }
        });
    }
    async update(id: number, data: UpdateFilmes) {
        return await prisma.filmes.update({ 
            where: { id }, 
            data,
            include: {
                atores: true,
                generos: true
            }
        });
    }
    async delete(id: number) {
        return await prisma.filmes.delete({ where: { id } });
    }
    async addAtores(filmeId: number, atorIds: number[]) {
        const filme = await prisma.filmes.findUnique({
            where: { id: filmeId },
            include: { atores: true }
        });
        if (!filme) throw new Error("Filme não encontrado");

        const existingAtorIds = filme.atores.map(ator => ator.id);
        const newAtorIds = atorIds.filter(id => !existingAtorIds.includes(id));

        if (newAtorIds.length === 0) return filme;

        await prisma.filmes.update({
            where: { id: filmeId },
            data: {
                atores: {
                    connect: newAtorIds.map(id => ({ id }))
                }
            }
        });

        return await prisma.filmes.findUnique({
            where: { id: filmeId },
            include: { atores: true }
        });
    }
    async removeAtores(filmeId: number, atorIds: number[]) {
        const filme = await prisma.filmes.findUnique({
            where: { id: filmeId },
            include: { atores: true }
        });
        if (!filme) throw new Error("Filme não encontrado");

        const existingAtorIds = filme.atores.map(ator => ator.id);
        const validAtorIds = atorIds.filter(id => existingAtorIds.includes(id));

        if (validAtorIds.length === 0) return filme;

        await prisma.filmes.update({
            where: { id: filmeId },
            data: {
                atores: {
                    disconnect: validAtorIds.map(id => ({ id }))
                }
            }
        });

        return await prisma.filmes.findUnique({
            where: { id: filmeId },
            include: { atores: true }
        });
    }
    async addGeneros(filmeId: number, generoIds: number[]) {
        const filme = await prisma.filmes.findUnique({
            where: { id: filmeId },
            include: { generos: true }
        });
        if (!filme) throw new Error("Filme não encontrado");

        const existingGeneroIds = filme.generos.map(genero => genero.id);
        const newGeneroIds = generoIds.filter(id => !existingGeneroIds.includes(id));

        if (newGeneroIds.length === 0) return filme;

        await prisma.filmes.update({
            where: { id: filmeId },
            data: {
                generos: {
                    connect: newGeneroIds.map(id => ({ id }))
                }
            }
        });

        return await prisma.filmes.findUnique({
            where: { id: filmeId },
            include: { generos: true }
        });
    }
}