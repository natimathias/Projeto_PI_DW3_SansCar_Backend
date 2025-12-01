import { LocacaoController } from "./locacoes.controller";

export async function LocacaoRoutes(fastify) {

    fastify.post("/locacoes", LocacaoController.criarLocacao);
    fastify.get("/locacoes", LocacaoController.listarLocacoes);
    fastify.get("/locacoes/:id_locacao", LocacaoController.buscarPorId);
    fastify.put("/locacoes/:id_locacao", LocacaoController.atualizarLocacao);
    fastify.delete("/locacoes/:id_locacao", LocacaoController.deletarLocacao);

}
