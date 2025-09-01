import { Injectable } from '@nestjs/common';
import { Movies } from './movies.entity';
import { CreateMoviesDto } from './dto/create-movies.dto';
import { UpdateMoviesDto } from './dto/update-movies.dto';
import { Actors } from '../actors/actors.entity';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class MoviesRepository {
    constructor(
        @InjectModel(Movies)
        private readonly moviesModel: typeof Movies,
    ) {}

    async findAll(): Promise<Movies[]> {
        return await this.moviesModel.findAll({
            include: [
                { model: Actors, as: 'actors' },
            ],
        });
    }

    async findById(id: number): Promise<Movies | null> {
        return await this.moviesModel.findByPk(id, {
            include: [
                { model: Actors, as: 'actors' },
            ],
        });
    }

    async create(createMoviesDto: CreateMoviesDto): Promise<Movies> {
        return await this.moviesModel.create(createMoviesDto as any);
    }

    async update(id: number, updateMovieDto: UpdateMoviesDto): Promise<[number]> {
        return await this.moviesModel.update(updateMovieDto, {
            where: { id },
        });
    }

    async remove(id: number): Promise<number> {
        return await this.moviesModel.destroy({
            where: { id },
        });
    }

    async findActorsByMovieId(movieId: number): Promise<Actors[]> {
        const movie = await this.findById(movieId);
        if (!movie) {
            return [];
        }
        return movie.actors;
    }

    async addActorToMovie(movieId: number, actorId: number): Promise<void> {
        const movie = await this.findById(movieId);
        if (!movie) {
            throw new Error('Filme não encontrado.');
        }
        await (movie as any).addActor(actorId);
    }
}