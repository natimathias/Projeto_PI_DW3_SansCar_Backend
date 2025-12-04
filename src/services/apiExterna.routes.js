import { ApiExternaController } from "./apiExterna.controller.js";

export function apiExternaRoutes(server, options, done) {

    server.get("/api-externa/cep/:cep", (req, reply) => 
        ApiExternaController.cep(req, reply)
    );

    server.get("/api-externa/combustiveis", (req, reply) =>
        ApiExternaController.combustiveis(req, reply)
    );

    done();
}
