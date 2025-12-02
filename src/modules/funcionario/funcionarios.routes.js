import { authMiddleware } from "../../middlewrares/auth.js";
import { FuncionarioController } from "./funcionarios.controller.js";

export async function funcionarioRoutes(fastify) {
    fastify.post('/login', FuncionarioController.login);
    fastify.post('/funcionarios', FuncionarioController.criarFuncionario);
    fastify.get('/funcionarios', { preHandler: authMiddleware }, FuncionarioController.listarFuncionarios);
    fastify.get('/funcionarios/:id_funcionario', { preHandler: authMiddleware }, FuncionarioController.buscarPorId);
    fastify.put('/funcionarios/:id_funcionario', { preHandler: authMiddleware }, FuncionarioController.atualizarFuncionario);
    fastify.delete('/funcionarios/:id_funcionario', { preHandler: authMiddleware }, FuncionarioController.deletarFuncionario);
}

