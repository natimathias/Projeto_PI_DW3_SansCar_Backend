import db from "../../infra/database.js";
import { Locacao, Carros, CategoriaCarro } from "../../infra/db/schema.js";
import { eq, sql } from "drizzle-orm";

export class RelatoriosRepository {

    static async carrosMaisAlugados() {
        return await db
            .select({
                modelo: Carros.modelo,
                total: sql`COUNT(${Locacao.id_carro})`
            })
            .from(Locacao)
            .innerJoin(Carros, eq(Locacao.id_carro, Carros.id_carro))
            .groupBy(Carros.modelo)
            .orderBy(sql`COUNT(${Locacao.id_carro}) DESC`);
    }

    static async categoriasMaisAlugadas() {
        return await db
            .select({
                categoria: CategoriaCarro.nome_categoria,
                total: sql`COUNT(${Locacao.id_carro})`
            })
            .from(Locacao)
            .innerJoin(Carros, eq(Locacao.id_carro, Carros.id_carro))
            .innerJoin(CategoriaCarro, eq(Carros.id_categoria, CategoriaCarro.id_categoria))
            .groupBy(CategoriaCarro.nome_categoria)
            .orderBy(sql`COUNT(${Locacao.id_carro}) DESC`);
    }
}
