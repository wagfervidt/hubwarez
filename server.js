const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();

app.use(cors());

app.get('/api-data', async (req, res) => {
  try {
    const response = await axios.get('https://hubwarez.tv/api.php');
    res.json(response.data);
  } catch (error) {
    console.error('Erro ao buscar dados:', error.message);
    res.status(500).json({ error: 'Erro ao buscar dados' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor proxy em execução na porta ${PORT}`);
});
