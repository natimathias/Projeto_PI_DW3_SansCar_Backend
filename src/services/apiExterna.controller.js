import ApiExternaService from "./apiExterna.service.js";

class ApiExternaController {

    async cep(request, reply) {
        const { cep } = request.params;

        try {
            const dados = await ApiExternaService.buscarEnderecoPorCep(cep);
            return reply.send(dados);
        } catch (error) {
            return reply.status(400).send({ erro: error.message });
        }
    }

    async combustiveis(request, reply) {
        try {
            const dados = await ApiExternaService.buscarPrecosCombustiveis();
            return reply.send(dados);
        } catch (error) {
            return reply.status(400).send({ erro: error.message });
        }
    }
}

export default new ApiExternaController();
