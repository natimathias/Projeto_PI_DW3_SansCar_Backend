import { CategoriaRepository } from "./categorias.repository.js";

export class CategoriaService {
    static async criarCategoria(data) {
        if (!data.nome_categoria || !data.valor_diaria ) {
            throw new Error("Nome da categoria e o valor da diária são obrigatórios.");
        }

        const novaCategoria = await CategoriaRepository.criarCategoria({
            nome_categoria: data.nome_categoria,
            valor_diaria: data.valor_diaria,
        })

        return novaCategoria[0];
    }

    static async listarCategorias() {
        return await CategoriaRepository.listarCategorias();
    }

    static async buscarPorId(id_categoria) {
        return await CategoriaRepository.buscarPorId(id_categoria);
    }

    static async atualizarCategoria(id_categoria, data) {
        const atualizarData = {...data};      

        const atualizado = await CategoriaRepository.atualizarCategoria(id_categoria, atualizarData);

        return atualizado[0];
    }

    static async deletarCategoria(id_categoria) {
        return await CategoriaRepository.deletarCategoria(id_categoria);
    }
}