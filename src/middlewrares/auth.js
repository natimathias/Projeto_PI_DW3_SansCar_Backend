import jwt from "jsonwebtoken";

export async function authMiddleware(req, reply) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return reply.code(401).send({ error: "Token não enviado" });
    }

    const token = authHeader.replace("Bearer ", "");

    try {
        const dadosCodificados = jwt.verify(token, process.env.JWT_SECRET);
        req.usuario = dadosCodificados;
        return;
    } catch (error) {
        return reply.code(401).send({ error: "Token inválido" });
    }
}

export function verificarCargo(cargosPermitidos) {
    return async function (req, reply) {
        if (!req.usuario || !cargosPermitidos.includes(req.usuario.cargo)) {
            return reply.code(403).send({ error: "Acesso negado." });
        }
        return;
    };
}
