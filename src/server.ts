import fastify from "fastify";
import dotenv from "dotenv";
import cors from "@fastify/cors";
import tempoRioVerdeRoutes from "./routes/tempoRioVerde";
import moonRioVerdeRoutes from "./routes/moonRioVerde";
import previsaoRioVerdeRoutes from "./routes/previsaoRioVerdeRoutes";

dotenv.config();

const server = fastify({ logger: true });
server.register(cors, { origin: '*' });

// Importa e registra as rotas


server.register(tempoRioVerdeRoutes);
server.register(moonRioVerdeRoutes);
server.register(previsaoRioVerdeRoutes);

const PORT = Number(process.env.PORT) || 3333;
server.listen({ port: PORT }, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});