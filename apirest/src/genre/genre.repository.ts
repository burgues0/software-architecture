import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Genre } from './genre.entity';
import { InferCreationAttributes } from 'sequelize';

@Injectable()
export class GenreRepository {
    constructor(
        @InjectModel(Genre)
        private genreModel: typeof Genre,
    ) {}

    async create(createGenreDto: InferCreationAttributes<Genre>): Promise<Genre> {
        return this.genreModel.create(createGenreDto);
    }

    async findAll(): Promise<Genre[]> {
        return this.genreModel.findAll();
    }

    async findById(id: number): Promise<Genre | null> {
        return this.genreModel.findByPk(id);
    }

    async remove(id: number): Promise<number> {
        return this.genreModel.destroy({
            where: { id },
        });
    }
}