import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { GenreService } from './genre.service';
import { GenreRepository } from './genre.repository';
import { Genre } from './genre.entity';

@Module({
    imports: [SequelizeModule.forFeature([Genre])],
    controllers: [],
    providers: [GenreService, GenreRepository],
    exports: [GenreService, GenreRepository],
})
export class GenreModule {}
