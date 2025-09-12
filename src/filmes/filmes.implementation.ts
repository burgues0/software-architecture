import * as grpc from '@grpc/grpc-js';
import { FilmesService } from './filmes.service';

export class FilmesImplementation {
    private filmesService: FilmesService;

    constructor() {
        this.filmesService = new FilmesService();
    }

    async listarFilmes(call: grpc.ServerUnaryCall<any, any>, callback: grpc.sendUnaryData<any>): Promise<void> {
        const filmes = await this.filmesService.listarTodos();
        const response = {
            filmes: filmes.map(filme => ({
                id: filme.id,
                titulo: filme.titulo,
                ano_lancamento: filme.anoLancamento,
                genero_id: filme.generoId,
                ator_ids: filme.atorIds
            }))
        };
        callback(null, response);
    }

    async obterFilmePorId(call: grpc.ServerUnaryCall<any, any>, callback: grpc.sendUnaryData<any>): Promise<void> {
        const filme = await this.filmesService.obterPorId(call.request.id);
        const response = {
            filme: filme ? {
                id: filme.id,
                titulo: filme.titulo,
                ano_lancamento: filme.anoLancamento,
                genero_id: filme.generoId,
                ator_ids: filme.atorIds
            } : null
        };
        callback(null, response);
    }

    async criarFilme(call: grpc.ServerUnaryCall<any, any>, callback: grpc.sendUnaryData<any>): Promise<void> {
        const filme = await this.filmesService.criar(call.request.titulo, call.request.ano_lancamento, call.request.genero_id);
        const response = {
            filme: {
                id: filme.id,
                titulo: filme.titulo,
                ano_lancamento: filme.anoLancamento,
                genero_id: filme.generoId,
                ator_ids: filme.atorIds
            }
        };
        callback(null, response);
    }

    async atualizarFilme(call: grpc.ServerUnaryCall<any, any>, callback: grpc.sendUnaryData<any>): Promise<void> {
        const filme = await this.filmesService.atualizar(call.request.id, call.request.titulo, call.request.ano_lancamento, call.request.genero_id);
        const response = {
            filme: filme ? {
                id: filme.id,
                titulo: filme.titulo,
                ano_lancamento: filme.anoLancamento,
                genero_id: filme.generoId,
                ator_ids: filme.atorIds
            } : null
        };
        callback(null, response);
    }

    async deletarFilme(call: grpc.ServerUnaryCall<any, any>, callback: grpc.sendUnaryData<any>): Promise<void> {
        const success = await this.filmesService.deletar(call.request.id);
        callback(null, { success });
    }

    async listarAtoresDoFilme(call: grpc.ServerUnaryCall<any, any>, callback: grpc.sendUnaryData<any>): Promise<void> {
        const atores = await this.filmesService.listarAtoresDoFilme(call.request.filme_id);
        const response = {
            atores: atores.map(ator => ({
                id: ator.id,
                nome: ator.nome,
                data_nascimento: ator.dataNascimento
            }))
        };
        callback(null, response);
    }

    async adicionarAtorAoFilme(call: grpc.ServerUnaryCall<any, any>, callback: grpc.sendUnaryData<any>): Promise<void> {
        const success = await this.filmesService.adicionarAtor(call.request.filme_id, call.request.ator_id);
        callback(null, { success });
    }
}
