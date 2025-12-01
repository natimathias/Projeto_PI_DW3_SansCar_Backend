import { CarroRepository } from "./carros.repository.js";

export class CarroService {
    static async criarCarro(data) {
        if (!data.id_categoria || !data.placa || !data.modelo ) {
            throw new Error("Categoria, placa e modelo são obrigatórios.");
        }

        const novoCarro = await CarroRepository.criarCarro({
            id_categoria: data.id_categoria,
            imagem_carro: data.imagem_carro?.trim() ? data.imagem: null,
            placa: data.placa,
            modelo: data.modelo,
            ano: data.ano,
            cor: data.cor,
            status: data.status ?? "disponível", 
            quilometragem_atual: data.quilometragem_atual ?? 0
        });
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