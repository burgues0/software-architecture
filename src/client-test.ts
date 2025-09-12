import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import * as path from 'path';

const PROTO_PATH = path.join(__dirname, '..', 'proto');

const generoPackageDefinition = protoLoader.loadSync(
    path.join(PROTO_PATH, 'generos.proto'),
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true,
    }
);

const atorPackageDefinition = protoLoader.loadSync(
    path.join(PROTO_PATH, 'atores.proto'),
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true,
    }
);

const filmePackageDefinition = protoLoader.loadSync(
    path.join(PROTO_PATH, 'filmes.proto'),
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true,
    }
);

const generoProto = grpc.loadPackageDefinition(generoPackageDefinition) as any;
const atorProto = grpc.loadPackageDefinition(atorPackageDefinition) as any;
const filmeProto = grpc.loadPackageDefinition(filmePackageDefinition) as any;

const SERVER_ADDRESS = 'localhost:50051';

const generoClient = new generoProto.generos.GeneroService(
    SERVER_ADDRESS,
    grpc.credentials.createInsecure()
);

const atorClient = new atorProto.atores.AtorService(
    SERVER_ADDRESS,
    grpc.credentials.createInsecure()
);

const filmeClient = new filmeProto.filmes.FilmeService(
    SERVER_ADDRESS,
    grpc.credentials.createInsecure()
);

async function testarGeneros() {
    console.log('\nTESTE GÊNEROS');
    
    generoClient.ListarGeneros({}, (error: any, response: any) => {
        if (error) {
            console.error('Erro:', error);
            return;
        }
        console.log('Lista:', response.generos);
    });

    generoClient.ObterGeneroPorId({ id: '1' }, (error: any, response: any) => {
        if (error) {
            console.error('Erro:', error);
            return;
        }
        console.log('Por ID:', response.genero);
    });

    generoClient.CriarGenero({ nome: 'Suspense' }, (error: any, response: any) => {
        if (error) {
            console.error('Erro:', error);
            return;
        }
        console.log('Criado:', response.genero);
    });
}

async function testarAtores() {
    console.log('\nTESTE ATORES');
    
    atorClient.ListarAtores({}, (error: any, response: any) => {
        if (error) {
            console.error('Erro:', error);
            return;
        }
        console.log('Lista:', response.atores);
    });

    atorClient.CriarAtor({ 
        nome: 'Ryan Gosling', 
        data_nascimento: '1980-11-12' 
    }, (error: any, response: any) => {
        if (error) {
            console.error('Erro:', error);
            return;
        }
        console.log('Criado:', response.ator);
    });
}

async function testarFilmes() {
    console.log('\nTESTE FILMES');
    
    filmeClient.ListarFilmes({}, (error: any, response: any) => {
        if (error) {
            console.error('Erro:', error);
            return;
        }
        console.log('Lista:', response.filmes);
    });

    filmeClient.CriarFilme({ 
        titulo: 'Blade Runner 2049', 
        ano_lancamento: 2017,
        genero_id: '5'
    }, (error: any, response: any) => {
        if (error) {
            console.error('Erro:', error);
            return;
        }
        console.log('Criado:', response.filme);
    });

    filmeClient.ListarAtoresDoFilme({ filme_id: '1' }, (error: any, response: any) => {
        if (error) {
            console.error('Erro:', error);
            return;
        }
        console.log('Atores do filme:', response.atores);
    });
}

function main() {
    console.log('Testando API gRPC...');
    
    setTimeout(() => {
        testarGeneros();
        setTimeout(() => {
            testarAtores();
            setTimeout(() => {
                testarFilmes();
            }, 2000);
        }, 2000);
    }, 1000);
}

if (require.main === module) {
    main();
}
