import fastify from 'fastify';
import { clienteRoutes } from './modules/clientes/clientes.routes.js';

const server = fastify({ logger: true });
const port = 8086;

server.register(clienteRoutes);

server.listen({ port }, (error) => {
  if (error) {
    console.error("Erro ao iniciar o servidor:", error);
    process.exit(1);
  }
  console.log("Servidor rodando na porta", port);
});