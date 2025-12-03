import { MultaService } from "./multas.service.js";

export class MultasController {
    static async gerarMulta(req, reply) {
        try {
            const multa = await MultaService.gerarMulta(req.params.id_locacao);
            reply.code(201).send(multa);
        } catch (error) {
            reply.code(400).send({ error: error.message });
        }
    }

    static async listarMultas(req, reply) {
        try {
            const lista = await MultaService.listarMultas();
            reply.code(200).send(lista);
        } catch (error) {
            reply.code(400).send({ error: error.message });
        }
    }

     static async listarPorLocacao(req, reply) {
        try {
            const multas = await MultaService.listarPorLocacao(req.params.id_locacao);

            return reply.send(multas);
        } catch (error) {
            return reply.status(400).send({ error: error.message });
        }
    }

    static async buscarPorId(req, reply) {
        try {
            const multa = await MultaService.buscarPorId(req.params.id_multa);
            reply.code(200).send(multa);
        } catch (error) {
            reply.code(400).send({ error: error.message });
        }
    }

    static async atualizarMulta(req, reply) {
        try {
            const atualizada = await MultaService.atualizarMulta(req.params.id_multa, req.body)
            reply.code(200).send(atualizada)
        } catch (error) {
            reply.code(400).send({ error: error.message });
        }
    }

    static async deletarMulta(req, reply) {
        try {
            await MultaService.deletarMulta(req.params.id_multa);
            reply.code(200).send({ message: "Multa deletada com sucesso!" });
        } catch (error) {
            reply.code(400).send({ error: error.message });
        }
    }
}