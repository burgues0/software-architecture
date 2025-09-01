import { Injectable, NotFoundException } from '@nestjs/common';
import { ActorsRepository } from './actors.repository';
import { Actors } from './actors.entity';
import { CreateActorsDto } from './dto/create-actors.dto';
import { UpdateActorsDto } from './dto/update-actors.dto';

@Injectable()
export class ActorsService {
    constructor(private readonly actorsRepository: ActorsRepository) {}

    async findAll(): Promise<Actors[]> {
        return this.actorsRepository.findAll();
    }

    async findById(id: number): Promise<Actors> {
        const actor = await this.actorsRepository.findById(id);
        if (!actor) {
            throw new NotFoundException(`Ator com ID ${id} não encontrado.`);
        }
        return actor;
    }

    async create(createActorsDto: CreateActorsDto): Promise<Actors> {
        return this.actorsRepository.create(createActorsDto);
    }

    async update(id: number, updateActorsDto: UpdateActorsDto): Promise<Actors | null> {
        const actor = await this.actorsRepository.findById(id);
        if (!actor) {
            throw new NotFoundException(`Ator com ID ${id} não encontrado.`);
        }
        await this.actorsRepository.update(id, updateActorsDto);
        return this.actorsRepository.findById(id);
    }

    async remove(id: number): Promise<void> {
        const affectedRows = await this.actorsRepository.remove(id);
        if (affectedRows === 0) {
            throw new NotFoundException(`Ator com ID ${id} não encontrado.`);
        }
    }
}