export class PagamentoService {

    static async criarPagamento(data) {
        const { id_locacao, id_forma_pagamento, valor } = data;

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

    static async listarPagamentos() {
        return await PagamentoRepository.listarPagamentos();
    }

    static async buscarPorId(id_pagamento) {
        return await PagamentoRepository.buscarPorId(id_pagamento);
    }

    static async atualizarPagamento(id_pagamento, data) {

        const pagamento = await PagamentoRepository.buscarPorId(id_pagamento);
        if (!pagamento) {
            throw new Error("Pagamento não encontrado.");
        }

        if (data.status === "confirmado") {

            const multas = await MultaRepository.listarPorLocacao(pagamento.id_locacao);
            const multaPendente = multas.some(m => m.status === "pendente");

            if (multaPendente) {
                throw new Error("Existem multas pendentes. Quite a multa antes do pagamento.");
            }
        }

        const atualizado = await PagamentoRepository.atualizarPagamento(id_pagamento, data);

        if (atualizado[0].status === "confirmado") {
            const locacao = await LocacaoRepository.buscarPorId(atualizado[0].id_locacao);
            const cliente = await ClienteRepository.buscarPorId(locacao.id_cliente);

            await enviarEmail(
                cliente.email,
                "Pagamento Confirmado - SansCar",
                `
                <h2>Pagamento confirmado</h2>
                <p>Olá, ${cliente.nome}!</p>
                <p>Pagamento de <strong>R$ ${atualizado[0].valor}</strong> confirmado.</p>
                `
            );
        }

        return atualizado[0];
    }

    static async deletarPagamento(id_pagamento) {
        return await PagamentoRepository.deletarPagamento(id_pagamento);
    }
}
