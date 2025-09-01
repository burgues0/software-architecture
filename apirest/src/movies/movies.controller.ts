import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMoviesDto } from './dto/create-movies.dto';
import { UpdateMoviesDto } from './dto/update-movies.dto';
import { Movies } from './movies.entity';
import { HateoasHelper } from 'src/common/hateoas.helper';
import type { HateoasResponse } from 'src/common/hateoas.helper';

@Controller('movies')
export class MoviesController {
    constructor(private readonly moviesService: MoviesService) {}

    @Get()
    async findAll(): Promise<HateoasResponse<any[]>> {
        try {
            const movies = await this.moviesService.getAllMovies();
            const moviesWithLinks = movies.map(movie => ({
                ...movies,
                _links: HateoasHelper.createMovieLinks(movie.id)
            }));
            return {
                statusCode: HttpStatus.OK,
                data: moviesWithLinks,
                _links: HateoasHelper.createMoviesCollectionLinks()
            }
        } catch (error) {
            throw new HttpException({
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: error instanceof Error ? error.message : 'Internal server error. Not able to fetch all movies.',
            }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<HateoasResponse<any>> {
        try {
            const movie = await this.moviesService.getMovieById(id);
            return {
                statusCode: HttpStatus.OK,
                data: movie,
                _links: HateoasHelper.createMovieLinks(movie.id)
            }
        } catch (error) {
            throw new HttpException({
                statusCode: HttpStatus.NOT_FOUND,
                message: error instanceof Error ? error.message : 'Movie with specified ID not found.',
            }, HttpStatus.NOT_FOUND);
        }
    }

    @Post()
    async create(@Body() createMoviesDto: CreateMoviesDto): Promise<HateoasHelper> {
        try {
            const movie = await this.moviesService.createMovie(createMoviesDto);
            return {
                statusCode: HttpStatus.CREATED,
                data: movie,
                _links: HateoasHelper.createMovieLinks(movie.id)
            }
        } catch (error) {
            throw new HttpException({
                statusCode: HttpStatus.BAD_REQUEST,
                message: error instanceof Error ? error.message : 'Error when trying to create movie.',
            }, HttpStatus.BAD_REQUEST);
        }
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() updateMoviesDto: UpdateMoviesDto): Promise<HateoasHelper | null> {
        try {
            const movie = await this.moviesService.updateMovie(id, updateMoviesDto);
            return {
                statusCode: HttpStatus.OK,
                data: movie,
                _links: HateoasHelper.createMovieLinks(id)
            }
        } catch (error) {
            throw new HttpException({
                statusCode: HttpStatus.BAD_REQUEST,
                message: error instanceof Error ? error.message : 'Error when trying to update movie.',
            }, HttpStatus.BAD_REQUEST);
        }
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async remove(@Param('id') id: number): Promise<void> {
        try {
            this.moviesService.deleteMovie(id);
        } catch (error) {
            throw new HttpException({
                statusCode: HttpStatus.NOT_FOUND,
                message: error instanceof Error ? error.message : 'Error when deleting movie: not found.',
            }, HttpStatus.NOT_FOUND);
        }
    }

    @Get(':id/actors')
    async findActors(@Param('id') id: number): Promise<HateoasResponse<any[]>> {
        try {
            const actors = await this.moviesService.getActorsByMovieId(id);
            const actorsWithLinks = actors.map(actor => ({
                ...actor.toJSON(),
                _links: HateoasHelper.createActorLinks(actor.id)
            }));
            return {
                statusCode: HttpStatus.OK,
                data: actorsWithLinks,
                _links: HateoasHelper.createMovieActorsLinks(id)
            }
        } catch (error) {
            throw new HttpException({
                statusCode: HttpStatus.NOT_FOUND,
                message: error instanceof Error ? error.message : 'Movie with specified ID not found.',
            }, HttpStatus.NOT_FOUND);
        }
    }
    
    @Post(':movieId/actors')
    async addActorToMovie(@Param('movieId') movieId: number, @Body('actorId') actorId: number): Promise<HateoasResponse<any>> {
        try {
            await this.moviesService.addActorToMovie(movieId, actorId);
            return {
                statusCode: HttpStatus.CREATED,
                message: 'Actor successfully added to movie.',
                _links: HateoasHelper.createMovieActorsLinks(movieId)
            }
        } catch (error) {
            throw new HttpException({
                statusCode: HttpStatus.BAD_REQUEST,
                message: error instanceof Error ? error.message : 'Error when adding actor to movie.',
            }, HttpStatus.BAD_REQUEST);
        }
    }
}