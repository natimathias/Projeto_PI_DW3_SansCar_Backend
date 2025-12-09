import { ContatoRepository } from "./contato.repository.js";
import { enviarEmail } from "../../utils/email.js";

export class ContatoService {

    static async criarContato(data) {

        if (!data.nome || !data.email || !data.mensagem) {
            const err = new Error("Nome, email e mensagem são obrigatórios.");
            err.status = 400;
            throw err;
        }

        const novoContato = await ContatoRepository.criarContato({
            nome: data.nome,
            email: data.email,
            assunto: data.assunto || "Sem assunto",
            mensagem: data.mensagem
        });

        await enviarEmail(
            novoContato[0].email,
            "Recebemos sua mensagem",
            `<h3>Olá, ${novoContato[0].nome}</h3>
            <p>Sua mensagem foi recebida pela SansCar. Logo responderemos.</p>`
        );

        await enviarEmail(
            process.env.EMAIL_SUPORTE,
            `Novo contato: ${novoContato[0].assunto}`,
            `
            <h3>Novo contato recebido</h3>
            <p><b>Nome:</b> ${novoContato[0].nome}</p>
            <p><b>Email:</b> ${novoContato[0].email}</p>
            <p><b>Mensagem:</b></p>
            <p>${novoContato[0].mensagem}</p>
            `
        );

        return novoContato[0];
    }

    static async listarContatos() {
        return await ContatoRepository.listarContatos();
    }
}
