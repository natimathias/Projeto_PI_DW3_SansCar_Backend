import { RelatoriosController } from "./relatorios.controller.js";

export async function relatoriosRoutes(fastify) {
    fastify.get("/relatorios/carros-mais-alugados", RelatoriosController.carrosMaisAlugados);
    fastify.get("/relatorios/categorias-mais-alugadas", RelatoriosController.categoriasMaisAlugadas);
}
