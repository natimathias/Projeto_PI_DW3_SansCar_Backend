import { eq } from "drizzle-orm";
import db from "../../infra/database.js";
import { Funcionario } from "../../infra/db/schema.js";

export class FuncionarioRepository {
    static async criarFuncionario(data) {
        return await db.insert(Funcionario).values(data).returning();
    }

    static async listarFuncionarios() {
        return await db.select().from(Funcionario);
    }

    static async buscarPorId(id_funcionario) {
        const funcionario = await db.select().from(Funcionario).where(eq(Funcionario.id_funcionario, id_funcionario));

        return funcionario[0];
    }

    static async buscarPorLogin(login) {
        const funcionario = await db.select().from(Funcionario).where(eq(Funcionario.login, login));

        return funcionario[0];
    }

    static async atualizarFuncionario(id_funcionario, data) {
        return await db.update(Funcionario).set(data).where(eq(Funcionario.id_funcionario, id_funcionario)).returning();
    }

    static async deletarFuncionario(id_funcionario) {
        return await db.delete(Funcionario).where(eq(Funcionario.id_funcionario, id_funcionario)).returning();
    }
}