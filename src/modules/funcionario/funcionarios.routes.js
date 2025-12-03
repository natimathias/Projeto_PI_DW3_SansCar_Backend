import { authMiddleware, verificarCargo } from "../../middlewrares/auth.js";
import { FuncionarioController } from "./funcionarios.controller.js";

export async function funcionarioRoutes(fastify) {
    fastify.post('/login', FuncionarioController.login);

    fastify.post(
        '/funcionarios',
        { preHandler: [authMiddleware, verificarCargo(["ADMIN"])] },
        FuncionarioController.criarFuncionario
    );

    fastify.get(
        '/funcionarios',
        { preHandler: [authMiddleware, verificarCargo(["ADMIN"])] },
        FuncionarioController.listarFuncionarios
    );

    fastify.get(
        '/funcionarios/:id_funcionario',
        { preHandler: [authMiddleware, verificarCargo(["ADMIN"])] },
        FuncionarioController.buscarPorId
    );

    fastify.put(
        '/funcionarios/:id_funcionario',
        { preHandler: [authMiddleware, verificarCargo(["ADMIN"])] },
        FuncionarioController.atualizarFuncionario
    );

    fastify.delete(
        '/funcionarios/:id_funcionario',
        { preHandler: [authMiddleware, verificarCargo(["ADMIN"])] },
        FuncionarioController.deletarFuncionario
    );
}
