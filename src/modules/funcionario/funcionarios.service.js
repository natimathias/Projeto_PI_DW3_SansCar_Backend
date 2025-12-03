import { compararSenha, hashSenha } from "../../utils/hash.js";
import { FuncionarioRepository } from "./funcionarios.repository.js";
import jwt from "jsonwebtoken";

export class FuncionarioService {

    static async criarFuncionario(data) {
        const { nome, cpf, cargo, login, senha } = data;

        if (!nome || !cpf || !cargo || !login || !senha) {
            throw new Error("Todos os campos são obrigatórios!");
        }

        const existeLogin = await FuncionarioRepository.buscarPorLogin(login);
        if (existeLogin) {
            throw new Error("Esse login já existe!");
        }

        const lista = await FuncionarioRepository.listarFuncionarios();
        const cpfExiste = lista.some(f => f.cpf === cpf);

        if (cpfExiste) {
            throw new Error("Esse CPF já está cadastrado!");
        }

        const senhaHash = await hashSenha(senha);

        const novoFuncionario = await FuncionarioRepository.criarFuncionario({
            nome,
            cpf,
            cargo,
            login,
            senha: senhaHash,
        });

        delete novoFuncionario[0].senha;

        return novoFuncionario[0];
    }

    static async login(data) {
        const { login, senha } = data;

        const funcionario = await FuncionarioRepository.buscarPorLogin(login);

        if (!funcionario) {
            throw new Error("Login inválido!");
        }

        const confereSenha = await compararSenha(senha, funcionario.senha);

        if (!confereSenha) {
            throw new Error("Senha inválida!");
        }

        const token = jwt.sign(
            {
                id_funcionario: funcionario.id_funcionario,
                nome: funcionario.nome,
                cargo: funcionario.cargo,
            },
            process.env.JWT_SECRET,
            { expiresIn: "5h" }
        );

        return {
            mensagem: "Login realizado com sucesso",
            token,
            funcionario: {
                id: funcionario.id_funcionario,
                nome: funcionario.nome,
                cargo: funcionario.cargo,
            }
        };
    }

    static async listarFuncionarios() {
        const funcionarios = await FuncionarioRepository.listarFuncionarios();

        return funcionarios.map(f => ({
            ...f,
            senha: undefined
        }));
    }

    static async buscarPorId(id_funcionario) {
        const funcionario = await FuncionarioRepository.buscarPorId(id_funcionario);

        if (!funcionario) return null;

        delete funcionario.senha;
        return funcionario;
    }

    static async atualizarFuncionario(id_funcionario, data) {
        const atualizarData = { ...data };

        if (data.senha) {
            atualizarData.senha = await hashSenha(data.senha);
        }

        const atualizado = await FuncionarioRepository.atualizarFuncionario(id_funcionario, atualizarData);

        delete atualizado[0].senha;
        return atualizado[0];
    }

    static async deletarFuncionario(id_funcionario) {
        return await FuncionarioRepository.deletarFuncionario(id_funcionario);
    }
}
