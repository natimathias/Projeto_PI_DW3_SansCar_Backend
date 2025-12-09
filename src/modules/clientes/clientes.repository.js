import { eq } from "drizzle-orm";
import db from "../../infra/database.js";
import { Cliente } from "../../infra/db/schema.js";

export class ClienteRepository {
    static async criarCliente(data) {
        return await db.insert(Cliente).values(data).returning();
    }

    static async listarClientes() {
        return await db.select().from(Cliente);
    }

    static async buscarPorId(id_cliente) {
        const cliente = await db.select().from(Cliente).where(eq(Cliente.id_cliente, id_cliente));

        return cliente[0];
    }

    static async buscarPorEmail(email) {
        const cliente = await db.select().from(Cliente).where(eq(Cliente.email, email));    
        return cliente[0];
    }

    static async atualizarCliente(id_cliente, data) {
        return await db.update(Cliente).set(data).where(eq(Cliente.id_cliente, id_cliente)).returning();
    }

    static async deletarCliente(id_cliente) {
        return await db.delete(Cliente).where(eq(Cliente.id_cliente, id_cliente)).returning();
    }
}