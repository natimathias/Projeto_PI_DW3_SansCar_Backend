import { ApiExternaService } from "./apiExterna.service.js";

export class ApiExternaController {

    static async cep(request, reply) {
        const { cep } = request.params;

        try {
            const dados = await ApiExternaService.buscarEnderecoPorCep(cep);
            return reply.send(dados);
        } catch (error) {
            return reply.status(400).send({ erro: error.message });
        }
    }

    static async combustiveis(request, reply) {
        try {
            const dados = await ApiExternaService.buscarPrecosCombustiveis();
            return reply.send(dados);
        } catch (error) {
            return reply.status(400).send({ erro: error.message });
        }
    }
}

