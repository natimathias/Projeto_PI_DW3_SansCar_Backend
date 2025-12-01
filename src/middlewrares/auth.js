import jwt from "jsonwebtoken";

export async function authMiddleware(req, reply, done) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return reply.code(401).send({error : "Token não enviado"});
    }

    const token = authHeader.replace("Bearer ", "");

    try {
        const dadosCodificados = jwt.verify(token, process.env.JWT_SECRET);
        req.usuario = dadosCodificados;
        done();
    } catch (error) {
        return reply.code(401).send({error : "Token inválido"});
    }
}