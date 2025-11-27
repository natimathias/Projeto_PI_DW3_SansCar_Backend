import { ClienteController } from "./clientes.controller.js"

export async function clienteRoutes(fastify) {
    fastify.post("/clientes", ClienteController.criarCliente);
    fastify.get("/clientes", ClienteController.listarClientes);
    fastify.get("/clientes/:id_cliente", ClienteController.buscarPorId);
    fastify.put("/clientes/:id_cliente", ClienteController.atualizarCliente);
    fastify.delete("/clientes/:id_cliente", ClienteController.deletarCliente);
}