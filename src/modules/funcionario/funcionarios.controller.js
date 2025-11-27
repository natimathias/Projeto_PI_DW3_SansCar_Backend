import { FuncionarioService } from "./funcionarios.service.js";

export class FuncionarioController {
    static async criarFuncionario(req, reply) {
        try {
            const funcionario = await FuncionarioService.criarFuncionario(req.body);
            reply.code(201).send(funcionario);
        } catch (error) {
            reply.code(400).send({ error: error.message });
        }
    }

    static async listarFuncionarios(req, reply) {
        try {
            const funcionarios = await FuncionarioService.listarFuncionarios();
            reply.code(200).send(funcionarios);
        } catch (error) {
            reply.code(400).send({ error: error.message });
        }
    }

    static async buscarPorId(req, reply) {
        try {
            const funcionario = await FuncionarioService.buscarPorId(req.params.id_funcionario);
            if (!funcionario) {
                return reply.code(404).send({ error: "Funcionario não encontrado!" });
            }
            reply.code(200).send(funcionario);
        } catch (error) {
            reply.code(400).send({ error: error.message });
        } 
    }

    static async atualizarFuncionario(req, reply) {
        try {
            const funcionarioAtualizado = await FuncionarioService.atualizarFuncionario(req.params.id_funcionario, req.body);
            reply.code(200).send(funcionarioAtualizado);
        } catch (error) {
            reply.code(400).send({ error: error.message });
        }
    }

    static async deletarFuncionario(req, reply) {
        try {
            await FuncionarioService.deletarFuncionario(req.params.id_funcionario);
            reply.code(200).send({ message: "Funcionario deletado com sucesso!" });
        } catch (error) {
            reply.code(400).send({ error: error.message });
        }
    }
}