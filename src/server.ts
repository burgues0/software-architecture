import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import * as path from 'path';

import { GenerosImplementation } from './generos/generos.implementation';
import { AtoresImplementation } from './atores/atores.implementation';
import { FilmesImplementation } from './filmes/filmes.implementation';

const PROTO_PATH = path.join(__dirname, '..', 'proto');

// Carregar os arquivos .proto
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

// Obter os serviços
const generoProto = grpc.loadPackageDefinition(generoPackageDefinition) as any;
const atorProto = grpc.loadPackageDefinition(atorPackageDefinition) as any;
const filmeProto = grpc.loadPackageDefinition(filmePackageDefinition) as any;

function main() {
    // Criar servidor gRPC
    const server = new grpc.Server();

    // Instanciar implementações
    const generosImplementation = new GenerosImplementation();
    const atoresImplementation = new AtoresImplementation();
    const filmesImplementation = new FilmesImplementation();

    // Adicionar serviços ao servidor
    server.addService(generoProto.generos.GeneroService.service, {
        ListarGeneros: generosImplementation.listarGeneros.bind(generosImplementation),
        ObterGeneroPorId: generosImplementation.obterGeneroPorId.bind(generosImplementation),
        CriarGenero: generosImplementation.criarGenero.bind(generosImplementation),
        AtualizarGenero: generosImplementation.atualizarGenero.bind(generosImplementation),
        DeletarGenero: generosImplementation.deletarGenero.bind(generosImplementation),
    });

    server.addService(atorProto.atores.AtorService.service, {
        ListarAtores: atoresImplementation.listarAtores.bind(atoresImplementation),
        ObterAtorPorId: atoresImplementation.obterAtorPorId.bind(atoresImplementation),
        CriarAtor: atoresImplementation.criarAtor.bind(atoresImplementation),
        AtualizarAtor: atoresImplementation.atualizarAtor.bind(atoresImplementation),
        DeletarAtor: atoresImplementation.deletarAtor.bind(atoresImplementation),
    });

    server.addService(filmeProto.filmes.FilmeService.service, {
        ListarFilmes: filmesImplementation.listarFilmes.bind(filmesImplementation),
        ObterFilmePorId: filmesImplementation.obterFilmePorId.bind(filmesImplementation),
        CriarFilme: filmesImplementation.criarFilme.bind(filmesImplementation),
        AtualizarFilme: filmesImplementation.atualizarFilme.bind(filmesImplementation),
        DeletarFilme: filmesImplementation.deletarFilme.bind(filmesImplementation),
        ListarAtoresDoFilme: filmesImplementation.listarAtoresDoFilme.bind(filmesImplementation),
        AdicionarAtorAoFilme: filmesImplementation.adicionarAtorAoFilme.bind(filmesImplementation),
    });

    // Configurar e iniciar servidor
    const port = process.env.PORT || 50051;
    const bindAddress = `0.0.0.0:${port}`;

    server.bindAsync(
        bindAddress,
        grpc.ServerCredentials.createInsecure(),
        (error, port) => {
            if (error) {
                return;
            }
            
            console.log(`🚀 Servidor gRPC rodando na porta ${port}`);
            console.log('Serviços disponíveis:');
            console.log('  - GeneroService (generos)');
            console.log('  - AtorService (atores)');
            console.log('  - FilmeService (filmes)');
            
            server.start();
        }
    );
}

// Tratamento de sinais para shutdown graceful
process.on('SIGINT', () => {
    console.log('\n🛑 Recebido SIGINT, desligando servidor...');
    process.exit(0);
});

process.on('SIGTERM', () => {
    console.log('\n🛑 Recebido SIGTERM, desligando servidor...');
    process.exit(0);
});

if (require.main === module) {
    main();
}
