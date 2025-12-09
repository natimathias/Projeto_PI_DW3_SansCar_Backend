import { ClienteService } from "./clientes.service.js";

export class ClienteController {

    static async criarCliente(req, reply) {
        try {
            const cliente = await ClienteService.criarCliente(req.body);
            reply.code(201).send(cliente);
        } catch (error) {
            reply.code(error.status || 400).send({ error: error.message });
        }
    }

    static async listarClientes(req, reply) {
        try {
            const clientes = await ClienteService.listarClientes();
            reply.code(200).send(clientes);
        } catch (error) {
            reply.code(400).send({ error: error.message });
        }
    }

    static async buscarPorId(req, reply) {
        try {
            const cliente = await ClienteService.buscarPorId(req.params.id_cliente);

            if (!cliente) {
                return reply.code(404).send({ error: "Cliente não encontrado!" });
            }

            reply.code(200).send(cliente);
        } catch (error) {
            reply.code(400).send({ error: error.message });
        }
    }

    static async atualizarCliente(req, reply) {
        try {
            const atualizado = await ClienteService.atualizarCliente(
                req.params.id_cliente,
                req.body
            );

            reply.code(200).send(atualizado);
        } catch (error) {
            reply.code(400).send({ error: error.message });
        }
    }

    static async deletarCliente(req, reply) {
        try {
            await ClienteService.deletarCliente(req.params.id_cliente);
            reply.code(200).send({ message: "Cliente deletado com sucesso!" });
        } catch (error) {
            reply.code(400).send({ error: error.message });
        }
    }

    static async login(req, reply) {
        try {
            const { email, senha } = req.body;
            const resultado = await ClienteService.login(email, senha);
            reply.code(200).send(resultado);
        } catch (error) {
            reply.code(error.status || 500).send({ error: error.message });
        }
    }

    static async me(req, reply) {
        try {
            const cliente = await ClienteService.buscarPorId(req.cliente.id_cliente);
            reply.code(200).send(cliente);
        } catch (error) {
            reply.code(400).send({ error: error.message });
        }
    }

    static async recuperarSenha(req, reply) {
        try {
            const { email } = req.body;
            await ClienteService.recuperarSenha(email);
            reply.code(200).send({ message: "Email de recuperação enviado!" });
        } catch (error) {
            reply.code(error.status || 500).send({ error: error.message });
        }
    }

    static async redefinirSenha(req, reply) {
        try {
            const { token, novaSenha } = req.body;
            await ClienteService.redefinirSenha(token, novaSenha);
            reply.code(200).send({ message: "Senha redefinida com sucesso!" });
        } catch (error) {
            reply.code(error.status || 500).send({ error: error.message });
        }
    }
}
