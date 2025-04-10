const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

let produtos = [];
let tarefas = [];

app.get('/produtos', (req, res) => {
    res.json(produtos);
});

app.post('/produtos', (req, res) => {
    produtos.push(req.body);
    res.status(201).json({ message: "Produto adicionado com sucesso!" });
});

app.get('/tarefas', (req, res) => {
    res.json(tarefas);
});

app.post('/tarefas', (req, res) => {
    tarefas.push(req.body);
    res.status(201).json({ message: "Tarefa adicionada com sucesso!" });
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
