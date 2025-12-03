import { MultasController } from "./multas.controller.js";

export async function multaRoutes(fastify) {
    fastify.post('/multas/gerar/:id_locacao', MultasController.gerarMulta);
    fastify.get('/multas', MultasController.listarMultas);
    fastify.get('/multas/locacao/:id_locacao', MultasController.listarPorLocacao);
    fastify.get('/multas/:id_multa', MultasController.buscarPorId);
    fastify.put('/multas/:id_multa', MultasController.atualizarMulta);
    fastify.delete('/multas/:id_multa', MultasController.deletarMulta);
}