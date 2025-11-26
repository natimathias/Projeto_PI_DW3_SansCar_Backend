import { CarroRepository } from "./carros.repository.js";

export class CarroService {
    static async criarCarro(data) {
        if (!data.placa || !data.modelo || !data.ano || !data.cor ) {
            throw new Error("Placa, modelo, ano e cor são obrigatórios.");
        }

        data.status = data.status ?? 'disponivel';

        const novoCarro = await CarroRepository.criarCarro(data);
        return novoCarro[0];
    }

    static async listarCarros() {
        return await CarroRepository.listarCarros();
    }

    static async buscarPorId(id_carro) {
        return await CarroRepository.buscarPorId(id_carro);
    }

    static async atualizarCarro(id_carro, data) {
        const atualizarData = {...data};

        const atualizado = await CarroRepository.atualizarCarro(id_carro, atualizarData);

        return atualizado[0];
    }

    static async deletarCarro(id_carro) {
        return await CarroRepository.deletarCarro(id_carro);
    }
}