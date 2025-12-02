import { FormasPagamentoRepository } from "../formasPagamento/formasPagamento.repository";
import { LocacaoRepository } from "../locacoes/locacoes.repository"
import { PagamentoRepository } from "./pagamentos.repository";

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
            id_locacao,
            id_forma_pagamento,
            valor,
            status: "pendente"
        });

        return novoPagamento[0];
    }

    static async listarPagamento() {
        return await PagamentoRepository.listarPagamento();
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