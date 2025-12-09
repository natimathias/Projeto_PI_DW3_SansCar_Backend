import fastify from 'fastify';
import { clienteRoutes } from './modules/clientes/clientes.routes.js';
import { carroRoutes } from './modules/carros/carros.routes.js';
import { categoriaRoutes } from './modules/categoriaCarros/categorias.routes.js';
import { funcionarioRoutes } from './modules/funcionario/funcionarios.routes.js';
import { locacaoRoutes } from './modules/locacoes/locacoes.routes.js';
import { formasPagamentoRoutes } from './modules/formasPagamento/formasPagamento.routes.js';
import { pagamentoRoutes } from './modules/pagamentos/pagamentos.routes.js';
import { multaRoutes } from './modules/multas/multas.routes.js';
import { apiExternaRoutes } from './services/apiExterna.routes.js'
import { contatoRoutes } from './modules/contato/contato.routes.js';
import { relatoriosRoutes } from './modules/relatorios/relatorios.routes.js';
import cors from '@fastify/cors';
import fastifyJwt from '@fastify/jwt';

const server = fastify({ logger: true });
const port = 8086;

server.register(cors, {
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
});

server.register(fastifyJwt, {
  secret: process.env.JWT_SECRET || 'troque_essa_chave',
})

server.register(clienteRoutes);
server.register(carroRoutes);
server.register(categoriaRoutes);
server.register(funcionarioRoutes);
server.register(locacaoRoutes);
server.register(formasPagamentoRoutes);
server.register(pagamentoRoutes);
server.register(multaRoutes);
server.register(apiExternaRoutes);
server.register(contatoRoutes);
server.register(relatoriosRoutes);

server.listen({ port }, (error) => {
  if (error) {
    console.error("Erro ao iniciar o servidor:", error);
    process.exit(1);
  }
  console.log("Servidor rodando na porta", port);
});