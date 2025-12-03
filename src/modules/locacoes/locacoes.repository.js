import { eq } from "drizzle-orm";
import db from "../../infra/database.js";
import { Locacao } from "../../infra/db/schema.js";

export class LocacaoRepository {
    static async criarLocacao(data) {
        return await db.insert(Locacao).values(data).returning();
    }

    static async listarLocacoes() {
        return await db.select().from(Locacao);
    }

    static async buscarPorId(id_locacao) {
        const locacao = await db.select().from(Locacao).where(eq(Locacao.id_locacao, id_locacao));

        return locacao[0];
    }

    static async atualizarLocacao(id_locacao, data) {
        return await db.update(Locacao).set(data).where(eq(Locacao.id_locacao, id_locacao)).returning();
    }
}