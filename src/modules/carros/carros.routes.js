import { CarroController } from "./carros.controller.js";

export async function carroRoutes(fastify) {
    fastify.post("/carros", CarroController.criarCarro);
    fastify.get("/carros", CarroController.listarCarros);
    fastify.get("/carros/:id_carro", CarroController.buscarPorId);
    fastify.put("/carros/:id_carro", CarroController.atualizarCarro);
    fastify.delete("/carros/:id_carro", CarroController.deletarCarro);
}