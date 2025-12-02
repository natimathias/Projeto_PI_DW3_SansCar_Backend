import { FormasPagamentoService } from "./formasPagamento.service.js";

export class FormasPagamentoController {
    static async criarFormaPagamento(req, reply) {
        try {
            const formaPagamento = await FormasPagamentoService.criarFormaPagamento(req.body);
            reply.code(201).send(formaPagamento);
        } catch (error) {
            reply.code(400).send({ error: error.message });
        }
    }

    static async listarFormasPagamento(req, reply) {
        try {
            const formasPagamento = await FormasPagamentoService.listarFormasPagamento();
            reply.code(200).send(formasPagamento);
        } catch (error) {
            reply.code(400).send({ error: error.message });
        }
    }

    static async buscarPorId(req, reply) {
        try {
            const formaPagamento = await FormasPagamentoService.buscarPorId(req.params.id_forma_pagamento);
            if (!formaPagamento) {
                return reply.code(404).send({ error: "Forma de pagamento não encontrada!" });
            }
            reply.code(200).send(formaPagamento);
        } catch (error) {
            reply.code(400).send({ error: error.message });
        } 
    }

    static async atualizarFormaPagamento(req, reply) {
        try {
            const formaPagamentoAtualizada = await FormasPagamentoService.atualizarFormaPagamento(req.params.id_forma_pagamento, req.body);
            reply.code(200).send(formaPagamentoAtualizada);
        } catch (error) {
            reply.code(400).send({ error: error.message });
        }
    }

    static async deletarFormaPagamento(req, reply) {
        try {
            await FormasPagamentoService.deletarFormaPagamento(req.params.id_forma_pagamento);
            reply.code(200).send({ message: "Forma de pagamento deletada com sucesso!" });
        } catch (error) {
            reply.code(400).send({ error: error.message });
        }
    }
}