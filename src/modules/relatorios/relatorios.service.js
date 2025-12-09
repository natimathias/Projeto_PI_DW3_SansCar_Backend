import { RelatoriosRepository } from "./relatorios.repository.js";

export class RelatoriosService {
    static async carrosMaisAlugados() {
        return await RelatoriosRepository.carrosMaisAlugados();
    }

    static async categoriasMaisAlugadas() {
        return await RelatoriosRepository.categoriasMaisAlugadas();
    }
}
