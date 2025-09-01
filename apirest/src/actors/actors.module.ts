import { Module } from '@nestjs/common';
import { ActorsController } from './actors.controller';
import { ActorsService } from './actors.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Actors } from './actors.entity';
import { ActorsRepository } from './actors.repository';

@Module({
  imports: [SequelizeModule.forFeature([Actors])],
  controllers: [ActorsController],
  providers: [ActorsService, ActorsRepository],
  exports: [ActorsService, ActorsRepository],
})
export class ActorsModule {}
