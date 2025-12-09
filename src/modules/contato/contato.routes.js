import { ContatoController } from "./contato.controller.js";

export async function contatoRoutes(fastify) {

    fastify.post("/contato", ContatoController.criarContato);

    fastify.get("/contato", ContatoController.listarContatos);
}
