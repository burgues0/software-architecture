import * as grpc from '@grpc/grpc-js';
import { GenerosService } from './generos.service';

export class GenerosImplementation {
    private generosService: GenerosService;

    constructor() {
        this.generosService = new GenerosService();
    }

    async listarGeneros(call: grpc.ServerUnaryCall<any, any>, callback: grpc.sendUnaryData<any>): Promise<void> {
        const generos = await this.generosService.listarTodos();
        callback(null, { generos });
    }

    async obterGeneroPorId(call: grpc.ServerUnaryCall<any, any>, callback: grpc.sendUnaryData<any>): Promise<void> {
        const genero = await this.generosService.obterPorId(call.request.id);
        callback(null, { genero });
    }

    async criarGenero(call: grpc.ServerUnaryCall<any, any>, callback: grpc.sendUnaryData<any>): Promise<void> {
        const genero = await this.generosService.criar(call.request.nome);
        callback(null, { genero });
    }

    async atualizarGenero(call: grpc.ServerUnaryCall<any, any>, callback: grpc.sendUnaryData<any>): Promise<void> {
        const genero = await this.generosService.atualizar(call.request.id, call.request.nome);
        callback(null, { genero });
    }

    async deletarGenero(call: grpc.ServerUnaryCall<any, any>, callback: grpc.sendUnaryData<any>): Promise<void> {
        const success = await this.generosService.deletar(call.request.id);
        callback(null, { success });
    }
}
