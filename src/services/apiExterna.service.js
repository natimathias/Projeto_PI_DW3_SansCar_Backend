import axios from "axios";

class ApiExternaService {

    async buscarEnderecoPorCep(cep) {
        try {
            const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
            return response.data;
        } catch (error) {
            throw new Error("Erro ao consultar CEP na API externa.");
        }
    }

    async buscarPrecosCombustiveis() {
        try {
            const response = await axios.get("https://brasilapi.com.br/api/combustiveis/v1/");
            return response.data;
        } catch (error) {
            throw new Error("Erro ao consultar preços de combustíveis.");
        }
    }
}

export default new ApiExternaService();
