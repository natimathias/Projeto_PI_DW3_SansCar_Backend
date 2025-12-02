import { PagamentoService } from "./pagamentos.service.js"

export class PagamentoController {
    static async criarPagamento(req, reply) {
        try {
            const pagamento = await PagamentoService.criarPagamento(req.body);
            reply.code(201).send(pagamento);
        } catch (error) {
            reply.code(400).send({ error: error.message });
        }
    }

    static async listarPagamentos(req, reply) {
        try {
            const pagamento = await PagamentoService.listarPagamento();
            reply.code(200).send(pagamento);
        } catch (error) {
            reply.code(400).send({ error: error.message });
        }
    }

    static async buscarPorId(req, reply) {
        try {
            const pagamento = await PagamentoService.buscarPorId(req.params.id_pagamento);
            if (!pagamento) {
                return reply.code(404).send({ error: "Pagamento não encontrado!" });
            }
            reply.code(200).send(pagamento);
        } catch (error) {
            reply.code(400).send({ error: error.message });
        } 
    }

    static async atualizarPagamento(req, reply) {
        try {
            const pagamentoAtualizado = await PagamentoService.atualizarPagamento(req.params.id_pagamento, req.body);
            reply.code(200).send(pagamentoAtualizado);
        } catch (error) {
            reply.code(400).send({ error: error.message });
        }
    }

    static async deletarPagamento(req, reply) {
        try {
            await PagamentoService.deletarPagamento(req.params.id_pagamento);
            reply.code(200).send({ message: "Pagamento deletado com sucesso!" });
        } catch (error) {
            reply.code(400).send({ error: error.message });
        }
    }
}