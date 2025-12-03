import { FormasPagamentoRepository } from "../formasPagamento/formasPagamento.repository.js";
import { LocacaoRepository } from "../locacoes/locacoes.repository.js"
import { PagamentoRepository } from "./pagamentos.repository.js";
import { enviarEmail } from "../../utils/email.js";
import { ClienteRepository } from "../clientes/clientes.repository.js";
import { CarroRepository } from "../carros/carros.repository.js";
import { MultaRepository } from "../multas/multas.repository.js";

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
        const pagamento = await PagamentoRepository.buscarPorId(id_pagamento);

        const atualizado = await PagamentoRepository.atualizarPagamento(id_pagamento, data);

        if (atualizado[0].status === "confirmado") {
            const locacao = await LocacaoRepository.buscarPorId(atualizado[0].id_locacao);
            const cliente = await ClienteRepository.buscarPorId(locacao.id_cliente);

            const multasPendentes = await MultaRepository.listarPorLocacao(locacao.id_locacao);
            if (multasPendentes.some(multa => multa.status === 'pendente')) {
                throw new Error("Existem multas pendentes para esta locação. O pagamento não pode ser confirmado.");
            }

            await CarroRepository.atualizarCarro(locacao.id_carro, {
                status: "disponivel",
            });

            await LocacaoRepository.atualizarLocacao(locacao.id_locacao, {
                status: "finalizada",
                data_devolucao_real: new Date()
            })

             await enviarEmail(cliente.email,
            "Pagamento Confirmado - SansCar",
            `
                <h2>Pagamento confirmado</h2>
                <p>Olá, ${cliente.nome}!</p>
                <p>Seu pagamento de <strong>R$ ${atualizado[0].valor}</strong> foi confirmado.</p>
                <p>Obrigado por escolher a SansCar!</p>
            `)
        }

        return atualizado[0];
    }

    static async deletarPagamento(id_pagamento) {
        return await PagamentoRepository.deletarPagamento(id_pagamento);
    }
}