import { ClienteController } from "./clientes.controller.js";
import { authCliente } from "../../middlewrares/authCliente.js";

export async function clienteRoutes(fastify) {

    fastify.post("/clientes", ClienteController.criarCliente);
    fastify.get("/clientes", ClienteController.listarClientes);
    fastify.get("/clientes/:id_cliente", ClienteController.buscarPorId);
    fastify.put("/clientes/:id_cliente", ClienteController.atualizarCliente);
    fastify.delete("/clientes/:id_cliente", ClienteController.deletarCliente);

    fastify.post("/clientes/login", ClienteController.login);

    fastify.get("/clientes/me", { preHandler: authCliente }, ClienteController.me);

    fastify.post("/clientes/recuperar-senha", ClienteController.recuperarSenha);

    fastify.post("/clientes/redefinir-senha", ClienteController.redefinirSenha);
}
