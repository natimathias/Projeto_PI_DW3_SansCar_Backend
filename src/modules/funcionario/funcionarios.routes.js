import { FuncionarioController } from "./funcionarios.controller.js";

export async function FuncionarioRoutes(fastify) {
    fastify.post('/funcionarios', FuncionarioController.criarFuncionario);
    fastify.get('/funcionarios', FuncionarioController.listarFuncionarios);
    fastify.get('/funcionarios/:id_funcionario', FuncionarioController.buscarPorId);
    fastify.put('/funcionarios/:id_funcionario', FuncionarioController.atualizarFuncionario);
    fastify.delete('/funcionarios/:id_funcionario', FuncionarioController.deletarFuncionario);
}

// Arrumar, tem que implementar o jws