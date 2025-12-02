import { eq } from "drizzle-orm";
import db from "../../infra/database.js";
import { Pagamento } from "../../infra/db/schema.js";

export class PagamentoRepository {
    static async criarPagamento(data) {
        return await db.insert(Pagamento).values(data).returning();
    }

    static async listarPagamentos() {
        return await db.select().from(Pagamento);
    }

    static async buscarPorId(id_pagamento) {
        const pagamento = await db.select().from(Pagamento).where(eq(Pagamento.id_pagamento, id_pagamento));

        return pagamento[0];
    }

    static async atualizarPagamento(id_pagamento, data) {
        return await db.update(Pagamento).set(data).where(eq(Pagamento.id_pagamento, id_pagamento)).returning();
    }

    static async deletarPagamento(id_pagamento) {
        return await db.delete(Pagamento).where(eq(Pagamento.id_pagamento, id_pagamento)).returning();
    }
}