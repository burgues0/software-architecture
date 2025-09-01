import { Sequelize } from 'sequelize-typescript';
import { Movies } from '../movies/movies.entity';
import { Actors } from '../actors/actors.entity';
import { Genre } from '../genre/genre.entity';
import { MovieActor } from '../movieactor/movieactor.entity';

import 'dotenv/config';

const { DB_HOST, DB_EXT_PORT, DB_DATABASE, DB_USER, DB_PASSWORD } = process.env;

if (!DB_HOST || !DB_EXT_PORT || !DB_DATABASE || !DB_USER || !DB_PASSWORD) {
  throw new Error('Variáveis de ambiente para conexão com o banco de dados não foram encontradas. Verifique seu arquivo .env.');
}

const port = parseInt(DB_EXT_PORT as string, 10);
if (isNaN(port)) {
  throw new Error(`DB_EXT_PORT inválido: "${DB_EXT_PORT}". Deve ser um número.`);
}

async function seedDatabase(): Promise<void> {
    const sequelize = new Sequelize({
        dialect: 'postgres',
        host: DB_HOST,
        port,
        username: DB_USER,
        password: DB_PASSWORD,
        database: DB_DATABASE,
        models: [Movies, Actors, Genre, MovieActor],
        logging: false,
    });

    try {
        await sequelize.authenticate();
        console.log('Conexão com o banco de dados estabelecida com sucesso.');

        await sequelize.sync({ force: true });
        console.log('Tabelas sincronizadas com sucesso.');

        const genres = [
            { name: 'Ação' },
            { name: 'Comédia' },
            { name: 'Drama' },
            { name: 'Ficção Científica' },
            { name: 'Terror' },
            { name: 'Animação' }
        ];

        const actors = [
            { name: 'Leonardo DiCaprio', birthDate: new Date('1974-11-11'), nationality: 'American' },
            { name: 'Tom Hanks', birthDate: new Date('1956-07-09'), nationality: 'American' },
            { name: 'Scarlett Johansson', birthDate: new Date('1984-11-22'), nationality: 'American' },
            { name: 'Robert Downey Jr.', birthDate: new Date('1965-04-04'), nationality: 'American' },
            { name: 'Emma Stone', birthDate: new Date('1988-11-06'), nationality: 'American' },
            { name: 'Chris Pratt', birthDate: new Date('1979-06-21'), nationality: 'American' }
        ];

        console.log('Populando a tabela de Gêneros...');
        const createdGenres = await Genre.bulkCreate(genres as any[]);

        console.log('Populando a tabela de Atores...');
        const createdActors = await Actors.bulkCreate(actors as any[]);

        console.log('Populando a tabela de Filmes...');
        const movies = [
            {
                title: 'Inception',
                releaseYear: 2010,
                synopsis: 'Um ladrão que rouba segredos corporativos através da tecnologia de compartilhamento de sonhos é encarregado de uma tarefa final e aparentemente impossível: a implantação.',
                runtime: 148,
                genreId: createdGenres[3].id
            },
            {
                title: 'Forrest Gump',
                releaseYear: 1994,
                synopsis: 'As presidências de Kennedy e Johnson, a Guerra do Vietnã, o escândalo de Watergate e outros eventos da história recente se desenrolam da perspectiva de um homem do Alabama com um QI de 75.',
                runtime: 142,
                genreId: createdGenres[2].id
            },
            {
                title: 'The Avengers',
                releaseYear: 2012,
                synopsis: 'Os heróis mais poderosos da Terra se unem para derrotar Loki e seu exército, que ameaçam a segurança global.',
                runtime: 143,
                genreId: createdGenres[0].id
            },
            {
                title: 'La La Land',
                releaseYear: 2016,
                synopsis: 'Um músico de jazz e uma aspirante a atriz se apaixonam e lutam para realizar seus sonhos em Los Angeles.',
                runtime: 128,
                genreId: createdGenres[2].id
            },
            {
                title: 'The Martian',
                releaseYear: 2015,
                synopsis: 'Um astronauta fica preso em Marte e precisa usar sua engenhosidade para sobreviver até que uma equipe de resgate possa chegar.',
                runtime: 144,
                genreId: createdGenres[3].id
            },
            {
                title: 'Guardians of the Galaxy',
                releaseYear: 2014,
                synopsis: 'Um grupo de inadaptados intergalácticos se une para proteger uma poderosa relíquia.',
                runtime: 121,
                genreId: createdGenres[0].id
            }
        ];
        const createdMovies = await Movies.bulkCreate(movies as any[]);

        console.log('Criando associações entre Filmes e Atores...');

        const movieActorAssociations = [
            { movieId: createdMovies[0].id, actorId: createdActors[0].id },
            { movieId: createdMovies[1].id, actorId: createdActors[1].id },
            { movieId: createdMovies[2].id, actorId: createdActors[3].id },
            { movieId: createdMovies[2].id, actorId: createdActors[2].id },
            { movieId: createdMovies[3].id, actorId: createdActors[4].id },
            { movieId: createdMovies[4].id, actorId: createdActors[1].id },
            { movieId: createdMovies[5].id, actorId: createdActors[5].id },
        ];

        await MovieActor.bulkCreate(movieActorAssociations as any[]);

        console.log('Banco de dados populado com sucesso!');
    } catch (error) {
        console.error('Erro ao popular o banco de dados:', error);
        throw error;
    } finally {
        await sequelize.close();
        console.log('Conexão com o banco de dados fechada.');
    }
}

seedDatabase()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error('Processo de seeding falhou.');
        console.error(error);
        process.exit(1);
    });
