import { FastifyInstance } from "fastify";
import fetch from "node-fetch";
import { getWeatherApiError } from "../error/error"

export default async function tempoRioVerdeRoutes(server: FastifyInstance) {
  server.get('/tempo/rioverde', async (req, res) => {
    const apiKey = process.env.WEATHER_API_KEY;
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=Rio Verde&lang=pt`;

    try {
      const resposta = await fetch(url);
      const dados: any = await resposta.json();

      if (dados.error) {
        const mensagem = getWeatherApiError(dados.error.code);
        return res.status(400).send({ erro: mensagem });
      }

      const resultado = {
        cidade: dados.location.name,
        temperatura: dados.current.temp_c,
        umidade: dados.current.humidity,
        condicao: dados.current.condition.text,
        vento_kph: dados.current.wind_kph,
        icone: dados.current.condition.icon,
      };

      res.send(resultado);
    } catch (erro) {
      res.status(500).send({ erro: 'Erro ao buscar os dados climáticos.' });
    }
  });
}