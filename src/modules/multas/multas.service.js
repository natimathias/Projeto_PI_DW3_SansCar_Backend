import { eq } from "drizzle-orm";
import db from "../../infra/database.js";
import { Carros, CategoriaCarro, Cliente } from "../../infra/db/schema.js";
import { LocacaoRepository } from "../locacoes/locacoes.repository.js";
import { MultaRepository } from "./multas.repository.js";
import { enviarEmail } from "../../utils/email.js";

export class MultaService {
    static async gerarMulta(id_locacao) {
        const locacao = await LocacaoRepository.buscarPorId(id_locacao);
        if (!locacao) {
            throw new Error("Locação não encontrada.");
        }

        if (!locacao.data_devolucao_real) {
            throw new Error("A locação ainda não foi devolvida.");
        }

        const carro = await db.select().from(Carros).where(eq(Carros.id_carro, locacao.id_carro));
        if (!carro[0]) {
            throw new Error("Carro da locação não encontrado.");
        }

        const categoria = await db.select().from(CategoriaCarro).where(eq(CategoriaCarro.id_categoria, carro[0].id_categoria));

        if (!categoria[0]) {
            throw new Error("Categoria do carro não encontrada.");
        }

        const cliente = await db.select().from(Cliente).where(eq(Cliente.id_cliente, locacao.id_cliente));

        if (!cliente[0]) {
            throw new Error("Cliente da locação não encontrado.");
        }

        const valorDiaria = Number(categoria[0].valor_diaria);
        const dataPrevista = new Date(locacao.data_devolucao_prevista);
        const dataReal = new Date(locacao.data_devolucao_real);

        let milisegundosPorDia = 1000 * 60 * 60 * 24;
        let valorMulta = 0;

        const diasAtraso = Math.ceil((dataReal - dataPrevista) / milisegundosPorDia);

        if (diasAtraso > 0) {
            valorMulta = diasAtraso * (valorDiaria * 0.2);
        }

        const novaMulta = await MultaRepository.criarMulta({
            id_locacao: id_locacao,
            descricao: `Multa por atraso de ${diasAtraso} dias.`,
            valor: valorMulta,
            status: 'pendente'
        });

        await enviarEmail(cliente[0].email,
            "Nova multa gerada - SansCar",
            `
            <h2>Você possui uma multa</h2>
            <p>Olá, ${cliente[0].nome}!</p>
            <p>Uma multa foi gerada em sua locação.</p>
            <p><strong>Descrição:</strong> ${novaMulta[0].descricao}</p>
            <p><strong>Valor:</strong> R$ ${novaMulta[0].valor}</p>`
        );

        return novaMulta[0];
    }

    static async listarMultas() {
        return await MultaRepository.listarMultas();
    }

    // static async pagarMulta(id_multa){
    //     const multa = await MultaRepository.buscarPorId(id_multa);

    //     if(!multa){
    //         throw new Error("Multa não encontrada.");
    //     }

    //     if(multa.status === 'paga'){
    //         throw new Error("Multa já foi paga.");
    //     }

    //     return await MultaRepository.atualizarMulta(id_multa, { status: 'paga' });
    // }

    static async listarPorLocacao(id_locacao) {
        return await MultaRepository.listarPorLocacao(id_locacao);
    }

    static async buscarPorId(id_multa) {
        return await MultaRepository.buscarPorId(id_multa);
    }

    static async atualizarMulta(id_multa, data) {
        return await MultaRepository.atualizarMulta(id_multa, data);
    }

    static async deletarMulta(id_multa) {
        return await MultaRepository.deletarMulta(id_multa);
    }
}