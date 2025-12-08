export async function authRoutes(fastify) {
    fastify.post("/login", async (req, reply) => {
    const { email, senha } = req.body;
    if (!email || !senha) return reply.code(400).send({ error: "Email e senha são obrigatórios" });

    const cliente = await ClienteRepository.buscarPorEmail(email);
    if (!cliente) return reply.code(400).send({ error: "E-mail não encontrado" });

    const ok = await compareSenha(senha, cliente.senha);
    if (!ok) return reply.code(400).send({ error: "Senha incorreta" });

    const token = fastify.jwt.sign({
      id_cliente: cliente.id_cliente,
      nome: cliente.nome,
      email: cliente.email
    });

    return reply.send({ token });
  });
}
