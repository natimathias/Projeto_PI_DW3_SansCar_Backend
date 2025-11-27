import { CategoriaService } from "./categorias.service.js";

export class CategoriaController {
    static async criarCategoria(req, reply) {
        try {
            const categoria = await CategoriaService.criarCategoria(req.body);
            reply.code(201).send(categoria);
        } catch (error) {
            reply.code(400).send({ error: error.message });
        }
    }

    static async listarCategorias(req, reply) {
        try {
            const categorias = await CategoriaService.listarCategorias();
            reply.code(200).send(categorias);
        } catch (error) {
            reply.code(400).send({ error: error.message });
        }
    }

    static async buscarPorId(req, reply) {
        try {
            const categoria = await CategoriaService.buscarPorId(req.params.id_categoria);
            if (!categoria) {
                return reply.code(404).send({ error: "Categoria não encontrado!" });
            }
            reply.code(200).send(categoria);
        } catch (error) {
            reply.code(400).send({ error: error.message });
        } 
    }

    static async atualizarCategoria(req, reply) {
        try {
            const categoriaAtualizado = await CategoriaService.atualizarCategoria(req.params.id_categoria, req.body);
            reply.code(200).send(categoriaAtualizado);
        } catch (error) {
            reply.code(400).send({ error: error.message });
        }
    }

    static async deletarCategoria(req, reply) {
        try {
            await CategoriaService.deletarCategoria(req.params.id_categoria);
            reply.code(200).send({ message: "Categoria deletada com sucesso!" });
        } catch (error) {
            reply.code(400).send({ error: error.message });
        }
    }
}