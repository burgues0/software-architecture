import { Injectable, NotFoundException } from '@nestjs/common';
import { GenreRepository } from './genre.repository';
import { Genre } from './genre.entity';

@Injectable()
export class GenreService {
    constructor(private readonly genreRepository: GenreRepository) {}

    async findAll(): Promise<Genre[]> {
        return this.genreRepository.findAll();
    }

    async findById(id: number): Promise<Genre> {
        const genre = await this.genreRepository.findById(id);
        if (!genre) {
            throw new NotFoundException(`Gênero com ID ${id} não encontrado.`);
        }
        return genre;
    }
}