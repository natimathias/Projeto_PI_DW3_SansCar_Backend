import { eq } from "drizzle-orm";
import db from "../../infra/database.js";
import { Multa } from "../../infra/db/schema.js";

export class MultaRepository {
    static async criarMulta(data) {
        return await db.insert(Multa).values(data).returning();
    }

    static async listarMultas() {
        return await db.select().from(Multa);
    }

    static async buscarPorId(id_multa) {
        const multa = await db.select().from(Multa).where(eq(Multa.id_multa, id_multa));

        return multa[0];
    }

    static async atualizarMulta(id_multa, data) {
        return await db.update(Multa).set(data).where(eq(Multa.id_multa, id_multa)).returning();
    }

    static async deletarMulta(id_multa) {
        return await db.delete(Multa).where(eq(Multa.id_multa, id_multa)).returning();
    }
}