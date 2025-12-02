import { LocacaoController } from "./locacoes.controller.js";

export async function locacaoRoutes(fastify) {
    fastify.post("/locacoes", LocacaoController.criarLocacao);
    fastify.get("/locacoes", LocacaoController.listarLocacoes);
    fastify.get("/locacoes/:id_locacao", LocacaoController.buscarPorId);
    fastify.put("/locacoes/:id_locacao", LocacaoController.atualizarLocacao);
    fastify.delete("/locacoes/:id_locacao", LocacaoController.deletarLocacao);

}
