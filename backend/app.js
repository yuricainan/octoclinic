const express = require('express');
const app = express();
const PORT = 5000;

app.get('/', (req, res) => {
  res.send('API do OctoClinic rodando!');
});

app.listen(PORT, () => {
  console.log(`Servidor backend rodando na porta ${PORT}`);
});