import { hashSenha } from "../../utils/hash.js";
import { FuncionarioRepository } from "./funcionarios.repository.js";

export class FuncionarioService {
    static async criarFuncionario(data) {
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

