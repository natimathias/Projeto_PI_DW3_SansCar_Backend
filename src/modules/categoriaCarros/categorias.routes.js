import { CategoriaController } from "./categorias.controller.js";

export async function categoriaRoutes(fastify) {
    fastify.post("/categorias", CategoriaController.criarCategoria);
    fastify.get("/categorias", CategoriaController.listarCategorias);
    fastify.get("/categorias/:id_categoria", CategoriaController.buscarPorId);
    fastify.put("/categorias/:id_categoria", CategoriaController.atualizarCategoria);
    fastify.delete("/categorias/:id_categoria", CategoriaController.deletarCategoria);
}