import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MoviesModule } from './movies/movies.module';
import { ActorsModule } from './actors/actors.module';
import { GenreModule } from './genre/genre.module';
import { Movies } from './movies/movies.entity';
import { Actors } from './actors/actors.entity';
import { MovieActor } from './movieactor/movieactor.entity';
import { Genre } from './genre/genre.entity';

import 'dotenv/config';

const { NODE_ENV, DB_HOST, DB_PORT, DB_DATABASE, DB_USER, DB_PASSWORD } = process.env;

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SequelizeModule.forRootAsync({
      useFactory: () => {
        if (!DB_HOST || !DB_PORT || !DB_DATABASE || !DB_USER || !DB_PASSWORD) {
          throw new Error(
            'Variáveis de ambiente para conexão com o banco de dados não foram encontradas. Verifique seu arquivo .env.',
          );
        }

        const port = parseInt(DB_PORT as string, 10);
        if (isNaN(port)) {
          throw new Error(`DB_PORT inválido: "${DB_PORT}". Deve ser um número.`);
        }

        console.log(`Conectando ao banco de dados: postgres://${DB_USER}@${DB_HOST}:${port}/${DB_DATABASE}`);

        return {
          dialect: 'postgres',
          host: DB_HOST,
          port,
          username: DB_USER,
          password: DB_PASSWORD,
          database: DB_DATABASE,
          autoLoadModels: true,
          synchronize: true,
          logging: console.log,
          dialectOptions: {
          },
        };
      },
    }),
    SequelizeModule.forFeature([
      Actors,
      Genre,
      MovieActor,
      Movies
    ]),
    ActorsModule,
    GenreModule,
    MoviesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
