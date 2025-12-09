import { ContatoService } from "./contato.service.js";

export class ContatoController {

    static async criarContato(req, reply) {
        try {
            const contato = await ContatoService.criarContato(req.body);
            reply.code(201).send(contato);
        } catch (error) {
            reply.code(error.status || 400).send({ error: error.message });
        }
    }

    static async listarContatos(req, reply) {
        try {
            const contatos = await ContatoService.listarContatos();
            reply.code(200).send(contatos);
        } catch (error) {
            reply.code(400).send({ error: error.message });
        }
    }
}
