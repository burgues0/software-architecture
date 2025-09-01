import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { ActorsService } from './actors.service';
import { CreateActorsDto } from './dto/create-actors.dto';
import { UpdateActorsDto } from './dto/update-actors.dto';
import { HateoasHelper } from 'src/common/hateoas.helper';
import type { HateoasResponse } from 'src/common/hateoas.helper';

@Controller('actors')
export class ActorsController {
    constructor(private readonly actorsService: ActorsService) {}

    @Get()
    async findAll(): Promise<HateoasResponse<any[]>> {
        try {
            const actors = await this.actorsService.findAll();
            const actorsWithLinks = actors.map(actor => ({
                ...actor.toJSON(),
                _links: HateoasHelper.createActorLinks(actor.id)
            }));
            return {
                statusCode: HttpStatus.OK,
                data: actorsWithLinks,
                _links: HateoasHelper.createActorsCollectionLinks()
            }
        } catch (error) {
            throw new HttpException({
                    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                    message: error instanceof Error ? error.message : 'Internal server error. Not able to fetch all actors.',
                },
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<HateoasResponse<any>> {
        try {
            const actor = await this.actorsService.findById(id);
            return {
                statusCode: HttpStatus.OK,
                data: actor,
                _links: HateoasHelper.createActorLinks(actor.id)
            }
        } catch (error) {
            throw new HttpException({
                    statusCode: HttpStatus.NOT_FOUND,
                    message: error instanceof Error ? error.message : 'Actor with specified ID not found.',
                },
                HttpStatus.NOT_FOUND,
            );
        }
    }

    @Post()
    async create(@Body() createActorsDto: CreateActorsDto): Promise<HateoasResponse<any>> {
        try {
            const actor = await this.actorsService.create(createActorsDto);
            return {
                statusCode: HttpStatus.CREATED,
                data: actor,
                _links: HateoasHelper.createActorLinks(actor.id)
            }
        } catch (error) {
            throw new HttpException({
                    statusCode: HttpStatus.BAD_REQUEST,
                    message: error instanceof Error ? error.message : 'Error when trying to create actor.',
                },
                HttpStatus.BAD_REQUEST,
            );
        }
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() updateActorsDto: UpdateActorsDto): Promise<HateoasResponse<any>> {
        try {
            const actor = await this.actorsService.update(id, updateActorsDto);
            return {
                statusCode: HttpStatus.OK,
                data: actor,
                _links: HateoasHelper.createActorLinks(id)
            }
        } catch (error) {
            throw new HttpException({
                    statusCode: HttpStatus.NOT_FOUND,
                    message: error instanceof Error ? error.message : 'Actor with specified ID not found.',
                },
                HttpStatus.NOT_FOUND,
            );
        }
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async remove(@Param('id') id: number): Promise<void> {
        try {
            await this.actorsService.remove(id);
        } catch (error) {
            throw new HttpException({
                    statusCode: HttpStatus.NOT_FOUND,
                    message: error instanceof Error ? error.message : 'Error when deleting actor: not found.',
                },
                HttpStatus.NOT_FOUND,
            );
        }
    }
}
