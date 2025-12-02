import { CarroRepository } from "../carros/carros.repository.js";
import { ClienteRepository } from "../clientes/clientes.repository.js";
import { FuncionarioRepository } from "../funcionario/funcionarios.repository.js";
import { LocacaoRepository } from "./locacoes.repository.js";

export class LocacaoService {
    static async criarLocacao(data) {

        data.data_retirada = new Date(data.data_retirada);
        data.data_devolucao_prevista = new Date(data.data_devolucao_prevista);

        if (data.data_devolucao_real) {
            data.data_devolucao_real = new Date(data.data_devolucao_real);
        }
        
        const { id_cliente, id_carro, id_funcionario } = data;

        const cliente = await ClienteRepository.buscarPorId(id_cliente);
        if (!cliente) throw new Error("Cliente não encontrado!");

        const carro = await CarroRepository.buscarPorId(id_carro);
        if (!carro) throw new Error("Carro não encontrado!");

        if (carro.status !== "disponivel") {
            throw new Error("Carro não está disponível para locação.");
        }

        const funcionario = await FuncionarioRepository.buscarPorId(id_funcionario);
        if (!funcionario) throw new Error("Funcionário não encontrado!");

        const novaLocacao = await LocacaoRepository.criarLocacao({
            ...data,
            quilometragem_atual: carro.quilometragem_atual,
        });

        await CarroRepository.atualizarCarro(id_carro, {
            status: "alugado",
        });

        return novaLocacao[0];
    }

    static async listarLocacoes() {
        return await LocacaoRepository.listarLocacoes();
    }

    static async buscarPorId(id_locacao) {
        return await LocacaoRepository.buscarPorId(id_locacao);
    }

    static async atualizarLocacao(id_locacao, data) {
        return await LocacaoRepository.atualizarLocacao(id_locacao, data);
    }

    static async deletarLocacao(id_locacao) {
        return await LocacaoRepository.deletarLocacao(id_locacao);
    }
}
