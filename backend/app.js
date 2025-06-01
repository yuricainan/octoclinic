const express = require('express');
const app = express();
const PORT = 5001;

app.get('/ping', (req, res) => {
  res.send('pong');
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});