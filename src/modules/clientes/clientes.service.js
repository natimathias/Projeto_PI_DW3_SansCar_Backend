import { hashSenha } from "../../utils/hash.js";
import { enviarEmail } from "../../utils/email.js";
import { ClienteRepository } from "./clientes.repository.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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
        });

        await enviarEmail(
            novoCliente[0].email,
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
        const atualizarData = { ...data };

        if (data.senha) {
            atualizarData.senha = await hashSenha(data.senha);
        }

        const atualizado = await ClienteRepository.atualizarCliente(
            id_cliente,
            atualizarData
        );

        return atualizado[0];
    }

    static async deletarCliente(id_cliente) {
        return await ClienteRepository.deletarCliente(id_cliente);
    }

    static async login(email, senha) {

        if (!email || !senha) {
            const error = new Error("Email e senha são obrigatórios.");
            error.status = 400;
            throw error;
        }

        const cliente = await ClienteRepository.buscarPorEmail(email);

        if (!cliente) {
            const error = new Error("Cliente não encontrado.");
            error.status = 404;
            throw error;
        }

        const senhaValida = await bcrypt.compare(senha, cliente.senha);

        if (!senhaValida) {
            const error = new Error("Senha inválida.");
            error.status = 401;
            throw error;
        }

        const token = jwt.sign(
            {
                id_cliente: cliente.id_cliente,
                nome: cliente.nome,
                email: cliente.email,
                cargo: "CLIENTE",
            },
            process.env.JWT_SECRET,
            { expiresIn: "8h" }
        );

        return {
            message: "Login realizado com sucesso!",
            token,
            cliente: {
                id_cliente: cliente.id_cliente,
                nome: cliente.nome,
                email: cliente.email,
            }
        };
    }

    static async recuperarSenha(email) {
        const cliente = await ClienteRepository.buscarPorEmail(email);

        if (!cliente) {
            const error = new Error("Email não encontrado.");
            error.status = 404;
            throw error;
        }

        const token = jwt.sign(
            { id_cliente: cliente.id_cliente },
            process.env.JWT_SECRET,
            { expiresIn: "15m" }
        );

        const link = `http://localhost:3000/redefinir-senha?token=${token}`;

        await enviarEmail(
            cliente.email,
            "Recuperação de senha - SansCar",
            `<p>Para redefinir sua senha, clique no link abaixo:</p>
             <a href="${link}">Redefinir senha</a>`
        );
    }

    static async redefinirSenha(token, novaSenha) {
        let decoded;

        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (error) {
            const err = new Error("Token inválido ou expirado.");
            err.status = 401;
            throw err;
        }

        const senhaHash = await hashSenha(novaSenha);

        await ClienteRepository.atualizarCliente(decoded.id_cliente, {
            senha: senhaHash
        });
    }
}
