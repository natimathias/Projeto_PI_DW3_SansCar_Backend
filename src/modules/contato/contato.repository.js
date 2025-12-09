import db from "../../infra/database.js";
import { Contato } from "../../infra/db/schema.js";
import { eq } from "drizzle-orm";

export class ContatoRepository {

    static async criarContato(data) {
        return await db.insert(Contato).values(data).returning();
    }

    static async listarContatos() {
        return await db.select().from(Contato);
    }
}
