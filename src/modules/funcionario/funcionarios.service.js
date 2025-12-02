import { compararSenha, hashSenha } from "../../utils/hash.js";
import { FuncionarioRepository } from "./funcionarios.repository.js";
import jwt from "jsonwebtoken";

export class FuncionarioService {
    static async criarFuncionario(data) {
        if(!data.nome || !data.cpf || !data.cargo || !data.login || !data.senha) {
            throw new Error("Todos os campos são obrigatórios!");
        }

        const existeLogin = await FuncionarioRepository.buscarPorLogin(data.login);
        if (existeLogin) {
            throw new Error("Esse login já existe!");
        }

        const senhaHash = await hashSenha(data.senha);

        const novoFuncionario = await FuncionarioRepository.criarFuncionario({
            nome: data.nome,
            cpf: data.cpf,
            cargo: data.cargo,
            login: data.login,
            senha: senhaHash,
        })

        return novoFuncionario[0];
    }

    static async login(data) {
        const funcionario = await FuncionarioRepository.buscarPorLogin(data.login);

        if(!funcionario) {
            throw new Error("Login inválido!");
        }

        const confereSenha = await compararSenha(data.senha, funcionario.senha);

        if(!confereSenha) {
            throw new Error("Senha inválida!");
        }

        const token = jwt.sign({
            id_funcionario: funcionario.id_funcionario,
            nome: funcionario.nome,
            cargo: funcionario.cargo,
        }, process.env.JWT_SECRET, { expiresIn: '5h' });

        return { token };
    }
    
    static async listarFuncionarios() {
        return await FuncionarioRepository.listarFuncionarios();
    }

    static async buscarPorId(id_funcionario) {
        return await FuncionarioRepository.buscarPorId(id_funcionario);
    }

    static async atualizarFuncionario(id_funcionario, data) {
        const atualizarData = {...data};

        if (data.senha) {
            atualizarData.senha = await hashSenha(data.senha);
        }       

        const atualizado = await FuncionarioRepository.atualizarFuncionario(id_funcionario, atualizarData);

        return atualizado[0];
    }

    static async deletarFuncionario(id_funcionario) {
        return await FuncionarioRepository.deletarFuncionario(id_funcionario);
    }
}