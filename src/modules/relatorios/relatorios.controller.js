import { RelatoriosService } from "./relatorios.service.js";

export class RelatoriosController {

    static async carrosMaisAlugados(req, reply) {
        const dados = await RelatoriosService.carrosMaisAlugados();
        return reply.send(dados);
    }

    static async categoriasMaisAlugadas(req, reply) {
        const dados = await RelatoriosService.categoriasMaisAlugadas();
        return reply.send(dados);
    }
}
