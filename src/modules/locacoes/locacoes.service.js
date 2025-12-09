import { CarroRepository } from "../carros/carros.repository.js";
import { ClienteRepository } from "../clientes/clientes.repository.js";
import { FuncionarioRepository } from "../funcionario/funcionarios.repository.js";
import { LocacaoRepository } from "./locacoes.repository.js";
import { enviarEmail } from "../../utils/email.js";
import { MultaService } from "../multas/multas.service.js";
import { PagamentoRepository } from "../pagamentos/pagamentos.repository.js";

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
            status_locacao: "ativa",
        });

        await CarroRepository.atualizarCarro(id_carro, {
            status: "alugado",
        });

        await enviarEmail(
            cliente.email,
            "Confirmação da sua locação",
            `<h3>Locação confirmada!</h3>
            <p>Modelo: ${carro.modelo}</p>
            <p>Retirada: ${data.data_retirada}</p>
            <p>Devolução prevista: ${data.data_devolucao_prevista}</p>`
        );

        return novaLocacao[0];
    }

    static async listarLocacoes() {
        return await LocacaoRepository.listarLocacoes();
    }

    static async buscarPorId(id_locacao) {
        return await LocacaoRepository.buscarPorId(id_locacao);
    }

    static async atualizarLocacao(id_locacao, data) {

        const locacao = await LocacaoRepository.buscarPorId(id_locacao);
        if (!locacao) throw new Error("Locação não encontrada.");

        if (data.data_devolucao_real) {
            data.data_devolucao_real = new Date(data.data_devolucao_real);

            if (locacao.status_locacao === "finalizada") {
                throw new Error("Esta locação já está finalizada.");
            }

            data.status_locacao = "finalizada";
        }

        const atualizada = await LocacaoRepository.atualizarLocacao(id_locacao, data);

        if (data.data_devolucao_real) {

            if (data.quilometragem_devolucao) {
                await CarroRepository.atualizarCarro(locacao.id_carro, {
                    quilometragem_atual: data.quilometragem_devolucao,
                    status: "disponivel",
                });
            }

            const cliente = await ClienteRepository.buscarPorId(locacao.id_cliente);

            await enviarEmail(
                cliente.email,
                "Devolução confirmada - SansCar",
                `
                <h2>Devolução registrada</h2>
                <p>Olá, ${cliente.nome}!</p>
                <p>Sua devolução foi registrada no sistema.</p>
                `
            );
        }

        return atualizada[0];
    }

    static async cancelarLocacao(id_locacao) {

        const locacao = await LocacaoRepository.buscarPorId(id_locacao);
        if (!locacao) throw new Error("Locação não encontrada.");

        if (locacao.status_locacao === "finalizada") {
            throw new Error("Não é possível cancelar uma locação já finalizada.");
        }

        if (locacao.status_locacao === "cancelada") {
            throw new Error("Esta locação já está cancelada.");
        }

        if (locacao.data_devolucao_real) {
            throw new Error("Não é possível cancelar uma locação já devolvida.");
        }

        if (new Date(locacao.data_retirada) <= new Date()) {
            throw new Error("A retirada já ocorreu. A locação não pode mais ser cancelada.");
        }

        const pagamentos = await PagamentoRepository.listarPorLocacao(id_locacao);
        const existePagamentoConfirmado = pagamentos.some(p => p.status === "confirmado");

        if (existePagamentoConfirmado) {
            throw new Error("Não é possível cancelar pois há pagamento confirmado.");
        }

        const cancelada = await LocacaoRepository.atualizarLocacao(id_locacao, {
            status_locacao: "cancelada",
        });

        await CarroRepository.atualizarCarro(locacao.id_carro, {
            status: "disponivel",
        });

        const cliente = await ClienteRepository.buscarPorId(locacao.id_cliente);

        await enviarEmail(
            cliente.email,
            "Locação Cancelada - SansCar",
            `
            <h2>Locação Cancelada</h2>
            <p>Olá, ${cliente.nome}.</p>
            <p>Sua locação foi cancelada com sucesso.</p>
            `
        );

        return cancelada[0];
    }


    static async finalizarLocacao(id_locacao, data) {

        const locacao = await LocacaoRepository.buscarPorId(id_locacao);
        if (!locacao) throw new Error("Locação não encontrada.");

        if (locacao.status_locacao !== "ativa") {
            throw new Error("Somente locações ativas podem ser finalizadas.");
        }

        if (!data.data_devolucao_real) {
            throw new Error("Data de devolução real é obrigatória.");
        }

        const dataReal = new Date(data.data_devolucao_real);
        const dataPrevista = new Date(locacao.data_devolucao_prevista);

        if (data.quilometragem_devolucao) {
            await CarroRepository.atualizarCarro(locacao.id_carro, {
                quilometragem_atual: data.quilometragem_devolucao,
                status: "disponivel"
            });
        } else {
            await CarroRepository.atualizarCarro(locacao.id_carro, { status: "disponivel" });
        }

        let multaGerada = null;

        if (dataReal > dataPrevista) {
            multaGerada = await MultaService.gerarMulta(id_locacao);
        }

        const finalizada = await LocacaoRepository.atualizarLocacao(id_locacao, {
            data_devolucao_real: dataReal,
            quilometragem_devolucao: data.quilometragem_devolucao,
            status_locacao: "finalizada"
        });

        const cliente = await ClienteRepository.buscarPorId(locacao.id_cliente);

        await enviarEmail(
            cliente.email,
            "Devolução finalizada - SansCar",
            `
            <h2>Devolução registrada</h2>
            <p>Olá, ${cliente.nome}.</p>
            ${multaGerada ? `<p><strong>Atenção:</strong> multa gerada por atraso: R$ ${multaGerada.valor}</p>` : `<p>Nenhuma multa foi gerada.</p>`}
            <p>Obrigado por utilizar a SansCar!</p>
            `
        );

        return {
            ...finalizada[0],
            multa: multaGerada || null
        };
    }
}
