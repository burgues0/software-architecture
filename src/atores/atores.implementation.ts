import * as grpc from '@grpc/grpc-js';
import { AtoresService } from './atores.service';

export class AtoresImplementation {
    private atoresService: AtoresService;

    constructor() {
        this.atoresService = new AtoresService();
    }

    async listarAtores(call: grpc.ServerUnaryCall<any, any>, callback: grpc.sendUnaryData<any>): Promise<void> {
        const atores = await this.atoresService.listarTodos();
        const response = {
            atores: atores.map(ator => ({
                id: ator.id,
                nome: ator.nome,
                data_nascimento: ator.dataNascimento
            }))
        };
        callback(null, response);
    }

    async obterAtorPorId(call: grpc.ServerUnaryCall<any, any>, callback: grpc.sendUnaryData<any>): Promise<void> {
        const ator = await this.atoresService.obterPorId(call.request.id);
        const response = {
            ator: ator ? {
                id: ator.id,
                nome: ator.nome,
                data_nascimento: ator.dataNascimento
            } : null
        };
        callback(null, response);
    }

    async criarAtor(call: grpc.ServerUnaryCall<any, any>, callback: grpc.sendUnaryData<any>): Promise<void> {
        const ator = await this.atoresService.criar(call.request.nome, call.request.data_nascimento);
        const response = {
            ator: {
                id: ator.id,
                nome: ator.nome,
                data_nascimento: ator.dataNascimento
            }
        };
        callback(null, response);
    }

    async atualizarAtor(call: grpc.ServerUnaryCall<any, any>, callback: grpc.sendUnaryData<any>): Promise<void> {
        const ator = await this.atoresService.atualizar(call.request.id, call.request.nome, call.request.data_nascimento);
        const response = {
            ator: ator ? {
                id: ator.id,
                nome: ator.nome,
                data_nascimento: ator.dataNascimento
            } : null
        };
        callback(null, response);
    }

    async deletarAtor(call: grpc.ServerUnaryCall<any, any>, callback: grpc.sendUnaryData<any>): Promise<void> {
        const success = await this.atoresService.deletar(call.request.id);
        callback(null, { success });
    }
}
