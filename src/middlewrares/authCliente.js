import jwt from "jsonwebtoken";

export async function authCliente(req, reply) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return reply.code(401).send({ error: "Token não enviado" });
    }

    const token = authHeader.replace("Bearer ", "");

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.cliente = decoded;

        if (decoded.cargo !== "CLIENTE") {
            return reply.code(403).send({ error: "Acesso negado: somente clientes." });
        }

    } catch (error) {
        return reply.code(401).send({ error: "Token inválido" });
    }
}
