import { eq } from "drizzle-orm";
import { CategoriaCarro } from "../../infra/db/schema.js";
import db from "../../infra/database.js";

export class CategoriaRepository {
    static async criarCategoria(data) {
        return await db.insert(CategoriaCarro).values(data).returning();
    }

    static async listarCategorias() {
        return await db.select().from(CategoriaCarro);
    }

    static async buscarPorId(id_categoria) {
        const categoria = await db.select().from(CategoriaCarro).where(eq(CategoriaCarro.id_categoria, id_categoria));

        return categoria[0];
    }

    static async atualizarCategoria(id_categoria, data) {
        return await db.update(CategoriaCarro).set(data).where(eq(CategoriaCarro.id_categoria, id_categoria)).returning();
    }

    static async deletarCategoria(id_categoria) {
        return await db.delete(CategoriaCarro).where(eq(CategoriaCarro.id_categoria, id_categoria)).returning();
    }
}