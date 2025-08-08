import fastify from "fastify";
import dotenv from "dotenv";
import cors from "@fastify/cors";
import tempoRioVerdeRoutes from "./routes/tempoRioVerde";
import moonRioVerdeRoutes from "./routes/moonRioVerde";
import previsaoRioVerdeRoutes from "./routes/previsaoRioVerdeRoutes";

dotenv.config();

const server = fastify({ logger: true });
server.register(cors, { origin: '*' });

// Health check endpoint for Render
server.get('/healthz', async (request, reply) => {
  return { status: 'ok' };
});

// Importa e registra as rotas
server.register(tempoRioVerdeRoutes);
server.register(moonRioVerdeRoutes);
server.register(previsaoRioVerdeRoutes);

const PORT = Number(process.env.PORT) || 3333;
server.listen({ port: PORT, host: '0.0.0.0' }, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});