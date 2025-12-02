import { FormasPagamentoRepository } from "./formasPagamento.repository.js";

export class FormasPagamentoService {
    static async criarFormaPagamento(data) {
        const { tipo_pagamento } = data;

        if (!tipo_pagamento) {
            throw new Error("O tipo de pagamento é obrigatório.");
        }

        if (tipo_pagamento === "cartao") {
            const informacoes = ["numero_cartao", "nome_titular", "validade", "cvv", "tipo_cartao"];
            informacoes.forEach((campo) => {
                if (!data[campo]) {
                    throw new Error(`O campo ${campo} é obrigatório para pagamento com cartão.`);
                }
            });
        }

        if (tipo_pagamento === "pix") {
            if (!data.pix_chave) {
                throw new Error("A chave PIX é obrigatória.");
            }
        }

        if (tipo_pagamento === "boleto") {
            if (!data.codigo_boleto) {
                throw new Error("O código do boleto é obrigatório.");
            }
        }

        const novasFormasPagamento = await FormasPagamentoRepository.criarFormaPagamento(data)

        return novasFormasPagamento[0];
    }

    static async listarFormasPagamento() {
        return await FormasPagamentoRepository.listarFormasPagamento();
    }

    static async buscarPorId(id_forma_pagamento) {
        return await FormasPagamentoRepository.buscarPorId(id_forma_pagamento);
    }

    static async atualizarFormaPagamento(id_forma_pagamento, data) {    
        const atualizado = await FormasPagamentoRepository.atualizarFormaPagamento(id_forma_pagamento, data);

        return atualizado[0];
    }

    static async deletarFormaPagamento(id_forma_pagamento) {
        return await FormasPagamentoRepository.deletarFormaPagamento(id_forma_pagamento);
    }
}