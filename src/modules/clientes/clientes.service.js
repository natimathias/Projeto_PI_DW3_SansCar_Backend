import { hashSenha } from "../../utils/hash.js";
import { enviarEmail } from "../../utils/email.js";
import { ClienteRepository } from "./clientes.repository.js";

export class ClienteService {
    static async criarCliente(data) {
        const senhaHash = await hashSenha(data.senha);

        const novoCliente = await ClienteRepository.criarCliente({
            nome: data.nome,
            cpf: data.cpf,
            telefone: data.telefone,
            endereco: data.endereco,
            email: data.email,
            senha: senhaHash,
        })

          await enviarEmail(novoCliente[0].email,
            "Bem-vindo à SansCar!",
            `<h2>Olá, ${novoCliente[0].nome}!</h2>
             <p>Seu cadastro foi realizado com sucesso.</p>`
        );

        return novoCliente[0];
    }

    static async listarClientes() {
        return await ClienteRepository.listarClientes();
    }

    static async buscarPorId(id_cliente) {
        return await ClienteRepository.buscarPorId(id_cliente);
    }

    static async atualizarCliente(id_cliente, data) {
        const atualizarData = {...data};

        if (data.senha) {
            atualizarData.senha = await hashSenha(data.senha);
        }       

        const atualizado = await ClienteRepository.atualizarCliente(id_cliente, atualizarData);

        return atualizado[0];
    }

    static async deletarCliente(id_cliente) {
        return await ClienteRepository.deletarCliente(id_cliente);
    }
}