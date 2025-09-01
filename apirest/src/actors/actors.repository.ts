import { Injectable } from '@nestjs/common';
import { Actors } from './actors.entity';
import { InjectModel } from '@nestjs/sequelize';
import { Movies } from '../movies/movies.entity';
import { CreateActorsDto } from './dto/create-actors.dto';
import { UpdateActorsDto } from './dto/update-actors.dto';

@Injectable()
export class ActorsRepository {
    constructor(
        @InjectModel(Actors)
        private readonly actorsModel: typeof Actors,
    ) {}

    async findAll(): Promise<Actors[]> {
        return await this.actorsModel.findAll({
            include: [
                { model: Movies, as: 'moviesCasted' },
            ],
        });
    }

    async findById(id: number): Promise<Actors | null> {
        return await this.actorsModel.findByPk(id, {
            include: [
                { model: Movies, as: 'moviesCasted' },
            ],
        });
    }

    async create(createActorsDto: CreateActorsDto): Promise<Actors> {
        return await this.actorsModel.create(createActorsDto as any);
    }

    async update(id: number, updateActorsDto: UpdateActorsDto): Promise<[number]> {
        return await this.actorsModel.update(updateActorsDto, {
            where: { id },
        });
    }

    async remove(id: number): Promise<number> {
        return await this.actorsModel.destroy({
            where: { id },
        });
    }
}