import fastify from 'fastify';
import { clienteRoutes } from './modules/clientes/clientes.routes.js';
import { carroRoutes } from './modules/carros/carros.routes.js';
import { categoriaRoutes } from './modules/categoriaCarros/categorias.routes.js';
import { funcionarioRoutes } from './modules/funcionario/funcionarios.routes.js';
import { locacaoRoutes } from './modules/locacoes/locacoes.routes.js';
import { formasPagamentoRoutes } from './modules/formasPagamento/formasPagamento.routes.js';

const server = fastify({ logger: true });
const port = 8086;

server.register(clienteRoutes);
server.register(carroRoutes);
server.register(categoriaRoutes);
server.register(funcionarioRoutes);
server.register(locacaoRoutes);
server.register(formasPagamentoRoutes);

server.listen({ port }, (error) => {
  if (error) {
    console.error("Erro ao iniciar o servidor:", error);
    process.exit(1);
  }
  console.log("Servidor rodando na porta", port);
});