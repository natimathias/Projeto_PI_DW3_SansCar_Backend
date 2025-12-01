import { LocacaoService } from "./locacoes.service.js";

export class LocacaoController {
    static async criarLocacao(req, reply) {
        try {
            const locacao = await LocacaoService.criarLocacao(req.body);
            reply.code(201).send(locacao);
        } catch (error) {
            reply.code(400).send({ error: error.message });
        }
    }

    static async listarLocacoes(req, reply) {
        try {
            const lista = await LocacaoService.listarLocacoes();
            reply.code(200).send(lista);
        } catch (error) {
            reply.code(400).send({ error: error.message });
        }
    }

    static async buscarPorId(req, reply) {
        try {
            const locacao = await LocacaoService.buscarPorId(req.params.id_locacao);

            if (!locacao) {
                return reply.code(404).send({ error: "Locação não encontrada!" });
            }

            reply.code(200).send(locacao);
        } catch (error) {
            reply.code(400).send({ error: error.message });
        }
    }

    static async atualizarLocacao(req, reply) {
        try {
            const atualizada = await LocacaoService.atualizarLocacao(
                req.params.id_locacao,
                req.body
            );

            reply.code(200).send(atualizada);
        } catch (error) {
            reply.code(400).send({ error: error.message });
        }
    }

    static async deletarLocacao(req, reply) {
        try {
            await LocacaoService.deletarLocacao(req.params.id_locacao);
            reply.code(200).send({ message: "Locação deletada com sucesso!" });
        } catch (error) {
            reply.code(400).send({ error: error.message });
        }
    }
}
