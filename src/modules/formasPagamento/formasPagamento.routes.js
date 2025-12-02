import { FormasPagamentoController } from "./formasPagamento.controller.js";

export async function formasPagamentoRoutes(fastify) {
    fastify.post("/formas_pagamento", FormasPagamentoController.criarFormaPagamento);
    fastify.get("/formas_pagamento", FormasPagamentoController.listarFormasPagamento);
    fastify.get("/formas_pagamento/:id_forma_pagamento", FormasPagamentoController.buscarPorId);
    fastify.put("/formas_pagamento/:id_forma_pagamento", FormasPagamentoController.atualizarFormaPagamento);
    fastify.delete("/formas_pagamento/:id_forma_pagamento", FormasPagamentoController.deletarFormaPagamento);
}