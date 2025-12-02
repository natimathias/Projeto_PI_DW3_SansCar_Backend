import { eq } from "drizzle-orm";
import db from "../../infra/database.js";
import { FormasPagamento } from "../../infra/db/schema.js";

export class FormasPagamentoRepository {
    static async criarFormaPagamento(data) {
        return await db.insert(FormasPagamento).values(data).returning();
    }

    static async listarFormasPagamento() {
        return await db.select().from(FormasPagamento);
    }

    static async buscarPorId(id_forma_pagamento) {
        const formasPagamento = await db.select().from(FormasPagamento).where(eq(FormasPagamento.id_forma_pagamento, id_forma_pagamento));

        return formasPagamento[0];
    }

    static async atualizarFormaPagamento(id_forma_pagamento, data) {
        return await db.update(FormasPagamento).set(data).where(eq(FormasPagamento.id_forma_pagamento, id_forma_pagamento)).returning();
    }

    static async deletarFormaPagamento(id_forma_pagamento) {
        return await db.delete(FormasPagamento).where(eq(FormasPagamento.id_forma_pagamento, id_forma_pagamento)).returning();
    }
}