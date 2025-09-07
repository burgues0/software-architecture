import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    await prisma.filmes.deleteMany();
    await prisma.atores.deleteMany();
    await prisma.generos.deleteMany();

    const acao = await prisma.generos.create({
        data: { nome: 'Ação' }
    });

    const drama = await prisma.generos.create({
        data: { nome: 'Drama' }
    });

    const comedia = await prisma.generos.create({
        data: { nome: 'Comédia' }
    });

    const ficcaoCientifica = await prisma.generos.create({
        data: { nome: 'Ficção Científica' }
    });

    const leonardoDiCaprio = await prisma.atores.create({
        data: {
            nome: 'Leonardo DiCaprio',
            nacionalidade: 'Americano'
        }
    });

    const margotRobbie = await prisma.atores.create({
        data: {
            nome: 'Margot Robbie',
            nacionalidade: 'Australiana'
        }
    });

    const keanuReeves = await prisma.atores.create({
        data: {
            nome: 'Keanu Reeves',
            nacionalidade: 'Canadense'
        }
    });

    const robertDowneyJr = await prisma.atores.create({
        data: {
            nome: 'Robert Downey Jr.',
            nacionalidade: 'Americano'
        }
    });

    const inception = await prisma.filmes.create({
        data: {
            titulo: 'A Origem',
            ano_lancamento: 2010,
            sinopse: 'Um ladrão que rouba segredos corporativos através do uso da tecnologia de compartilhamento de sonhos.',
            generos: {
                connect: [{ id: acao.id }, { id: ficcaoCientifica.id }]
            },
            atores: {
                connect: [{ id: leonardoDiCaprio.id }]
            }
        }
    });

    const matrix = await prisma.filmes.create({
        data: {
            titulo: 'Matrix',
            ano_lancamento: 1999,
            sinopse: 'Um hacker descobre que a realidade como ele a conhece é uma simulação controlada por máquinas.',
            generos: {
                connect: [{ id: acao.id }, { id: ficcaoCientifica.id }]
            },
            atores: {
                connect: [{ id: keanuReeves.id }]
            }
        }
    });

    const wolfOfWallStreet = await prisma.filmes.create({
        data: {
            titulo: 'O Lobo de Wall Street',
            ano_lancamento: 2013,
            sinopse: 'A história real de Jordan Belfort, desde sua ascensão como corretor da bolsa até sua queda por envolvimento em crimes.',
            generos: {
                connect: [{ id: drama.id }, { id: comedia.id }]
            },
            atores: {
                connect: [{ id: leonardoDiCaprio.id }, { id: margotRobbie.id }]
            }
        }
    });

    const ironMan = await prisma.filmes.create({
        data: {
            titulo: 'Homem de Ferro',
            ano_lancamento: 2008,
            sinopse: 'Tony Stark constrói uma armadura blindada para escapar do cativeiro e se torna o super-herói Homem de Ferro.',
            generos: {
                connect: [{ id: acao.id }, { id: ficcaoCientifica.id }]
            },
            atores: {
                connect: [{ id: robertDowneyJr.id }]
            }
        }
    });
}

main()
    .catch((e) => {
        console.error('Erro durante o seed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });