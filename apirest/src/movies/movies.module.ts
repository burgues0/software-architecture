import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { MoviesRepository } from './movies.repository';
import { Movies } from './movies.entity';
import { ActorsModule } from '../actors/actors.module';

@Module({
    imports: [SequelizeModule.forFeature([Movies]), ActorsModule],
    controllers: [MoviesController],
    providers: [MoviesService, MoviesRepository],
})
export class MoviesModule {}