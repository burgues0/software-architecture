// src/movies/movies.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { MoviesRepository } from './movies.repository';
import { CreateMoviesDto } from './dto/create-movies.dto';
import { UpdateMoviesDto } from './dto/update-movies.dto';
import { Movies } from './movies.entity';
import { ActorsRepository } from '../actors/actors.repository';
import { Actors } from 'src/actors/actors.entity';

@Injectable()
export class MoviesService {
    constructor(
        private readonly moviesRepository: MoviesRepository,
        private readonly actorsRepository: ActorsRepository,
    ) {}

    async getAllMovies(): Promise<Movies[]> {
        return this.moviesRepository.findAll();
    }

    async getMovieById(id: number): Promise<Movies> {
        const movie = await this.moviesRepository.findById(id);
        if (!movie) {
            throw new NotFoundException(`Filme com ID ${id} não encontrado.`);
        }
        return movie;
    }

    async createMovie(createMoviesDto: CreateMoviesDto): Promise<Movies> {
        return this.moviesRepository.create(createMoviesDto);
    }

    async updateMovie(id: number, updateMoviesDto: UpdateMoviesDto): Promise<Movies | null> {
        const movie = await this.moviesRepository.findById(id);
        if (!movie) {
            throw new NotFoundException(`Filme com ID ${id} não encontrado.`);
        }
        await this.moviesRepository.update(id, updateMoviesDto);
        return this.moviesRepository.findById(id);
    }

    async deleteMovie(id: number): Promise<void> {
        const affectedRows = await this.moviesRepository.remove(id);
        if (affectedRows === 0) {
            throw new NotFoundException(`Filme com ID ${id} não encontrado.`);
        }
    }

    async getActorsByMovieId(movieId: number): Promise<Actors[]> {
        const movie = await this.moviesRepository.findById(movieId);
        if (!movie) {
            throw new NotFoundException(`Filme com ID ${movieId} não encontrado.`);
        }
        return movie.actors;
    }

    async addActorToMovie(movieId: number, actorId: number): Promise<void> {
        const movie = await this.moviesRepository.findById(movieId);
        if (!movie) {
            throw new NotFoundException(`Filme com ID ${movieId} não encontrado.`);
        }

        const actor = await this.actorsRepository.findById(actorId);
        if (!actor) {
            throw new NotFoundException(`Ator com ID ${actorId} não encontrado.`);
        }

        return this.moviesRepository.addActorToMovie(movieId, actorId);
    }
}