import { CarroService } from "./carros.service.js";

export class CarroController {
    static async criarCarro(req, reply) {
        try {
            const carro = await CarroService.criarCarro(req.body);
            reply.code(201).send(carro);
        } catch (error) {
            reply.code(400).send({ error: error.message });
        }
    }

    static async listarCarros(req, reply) {
        try {
            const carros = await CarroService.listarCarros();
            reply.code(200).send(carros);
        } catch (error) {
            reply.code(400).send({ error: error.message });
        }
    }

    static async buscarPorId(req, reply) {
        try {
            const carro = await CarroService.buscarPorId(req.params.id_carro);
            if (!carro) {
                return reply.code(404).send({ error: "Carro não encontrado!" });
            }
            reply.code(200).send(carro);
        } catch (error) {
            reply.code(400).send({ error: error.message });
        } 
    }

    static async atualizarCarro(req, reply) {
        try {
            const carroAtualizado = await CarroService.atualizarCarro(req.params.id_carro, req.body);
            reply.code(200).send(carroAtualizado);
        } catch (error) {
            reply.code(400).send({ error: error.message });
        }
    }

    static async deletarCarro(req, reply) {
        try {
            await CarroService.deletarCarro(req.params.id_carro);
            reply.code(200).send({ message: "Carro deletado com sucesso!" });
        } catch (error) {
            reply.code(400).send({ error: error.message });
        }
    }
}