// backend/frete.js
const express = require('express');
const fetch = require('node-fetch');
const app = express();

app.use(express.json());

const PASSO_FUNDO = { lat: -28.2606, lon: -52.4065 }; // coordenadas aproximadas Passo Fundo

// Função para calcular distância entre dois pontos lat/lon (Haversine)
function calcularDistanciaKm(lat1, lon1, lat2, lon2) {
    function toRad(x) { return x * Math.PI / 180; }
    const R = 6371; // Raio da Terra em km
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
}

// Endpoint para calcular frete baseado no CEP
app.post('/calcular-frete', async (req, res) => {
    const { cep } = req.body;

    if (!cep) {
        return res.status(400).json({ error: 'CEP é obrigatório' });
    }

    try {
        // Consulta endereço no ViaCEP
        const viacepRes = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const viacepData = await viacepRes.json();

        if (viacepData.erro) {
            return res.status(400).json({ error: 'CEP inválido' });
        }

        const enderecoStr = `${viacepData.logradouro} ${viacepData.localidade} ${viacepData.uf}`;

        // Geocodificar endereço com Nominatim (OpenStreetMap)
        const nominatimRes = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(enderecoStr)}&format=json&limit=1`);
        const nominatimData = await nominatimRes.json();

        if (nominatimData.length === 0) {
            return res.status(400).json({ error: 'Não foi possível localizar o endereço' });
        }

        const clienteLat = parseFloat(nominatimData[0].lat);
        const clienteLon = parseFloat(nominatimData[0].lon);

        // Calcular distância entre Passo Fundo e cliente
        const distanciaKm = calcularDistanciaKm(PASSO_FUNDO.lat, PASSO_FUNDO.lon, clienteLat, clienteLon);

        // Limite de entrega: 50 km (exemplo)
        if (distanciaKm > 50) {
            return res.status(400).json({ error: 'Entrega disponível somente em até 50km de Passo Fundo' });
        }

        // Calcular frete: R$ 1,50 por km (exemplo)
        const valorFrete = (distanciaKm * 1.5).toFixed(2);

        return res.json({ frete: Number(valorFrete), distancia: distanciaKm.toFixed(2) });

    } catch (error) {
        return res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Servidor de frete rodando na porta ${PORT}`);
});
