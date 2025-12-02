import { FormasPagamentoRepository } from "../formasPagamento/formasPagamento.repository.js";
import { LocacaoRepository } from "../locacoes/locacoes.repository.js"
import { PagamentoRepository } from "./pagamentos.repository.js";

export class PagamentoService {
    static async criarPagamento(data) {
        const {id_locacao, id_forma_pagamento } = data;

        const locacao = await LocacaoRepository.buscarPorId(id_locacao);
        if (!locacao) {
            throw new Error("Locação não encontrada.");
        }

        const formaPagamento = await FormasPagamentoRepository.buscarPorId(id_forma_pagamento);
        if (!formaPagamento) {
            throw new Error("Forma de pagamento não encontrada.");
        }

        const novoPagamento = await PagamentoRepository.criarPagamento({
            id_locacao: data.id_locacao,
            id_forma_pagamento: data.id_forma_pagamento,
            valor: data.valor,
            status: "pendente"
        });

        return novoPagamento[0];
    }

    static async listarPagamento() {
        return await PagamentoRepository.listarPagamentos();
    }

    static async buscarPorId(id_pagamento) {
        return await PagamentoRepository.buscarPorId(id_pagamento);
    }

    static async atualizarPagamento(id_pagamento, data) {    
        const atualizado = await PagamentoRepository.atualizarPagamento(id_pagamento, data);

        return atualizado[0];
    }

    static async deletarPagamento(id_pagamento) {
        return await PagamentoRepository.deletarPagamento(id_pagamento);
    }
}