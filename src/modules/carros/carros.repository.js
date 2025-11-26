import { eq } from "drizzle-orm";
import db from "../../infra/database.js";
import { Carros } from "../../infra/db/schema.js";

export class CarroRepository {
    static async criarCarro(data) {
        return await db.insert(Carros).values(data).returning();
    }

    static async listarCarros() {
        return await db.select().from(Carros);
    }

    static async buscarPorId(id_carro) {
        const carro = await db.select().from(Carros).where(eq(Carros.id_carro, id_carro));

        return carro[0];
    }

    static async atualizarCarro(id_carro, data) {
        return await db.update(Carros).set(data).where(eq(Carros.id_carro, id_carro)).returning();
    }

    static async deletarCarro(id_carro) {
        return await db.delete(Carros).where(eq(Carros.id_carro, id_carro)).returning();
    }
}