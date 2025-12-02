import { PagamentoController } from "./pagamentos.controller.js";

export async function pagamentoRoutes(fastify) {
    fastify.post("/pagamento", PagamentoController.criarPagamento);
    fastify.get("/pagamento", PagamentoController.listarPagamentos);
    fastify.get("/pagamento/:id_pagamento", PagamentoController.buscarPorId);
    fastify.put("/pagamento/:id_pagamento", PagamentoController.atualizarPagamento);
    fastify.delete("/pagamento/:id_pagamento", PagamentoController.deletarPagamento);
}