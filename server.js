const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Define a pasta "public" como estática
app.use(express.static(path.join(__dirname, 'public')));

// Roteia arquivos sem precisar do .html
app.get('/:page', (req, res, next) => {
    const filePath = path.join(__dirname, 'public', `${req.params.page}.html`);
    res.sendFile(filePath, (err) => {
        if (err) next();
    });
});

// Página inicial
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
