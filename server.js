const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Banco de dados SQLite
const db = new sqlite3.Database('./estoque.db', (err) => {
    if (err) console.error(err.message);
    console.log('Banco de dados conectado.');
});

// Criar tabela de produtos
db.run(`CREATE TABLE IF NOT EXISTS produtos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT,
    quantidade INTEGER,
    filial TEXT,
    dataEntrada TEXT,
    dataSaida TEXT
)`);

// Rota para obter produtos
app.get('/produtos', (req, res) => {
    db.all('SELECT * FROM produtos', [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// Rota para adicionar produto
app.post('/produtos', (req, res) => {
    const { nome, quantidade, filial, dataEntrada, dataSaida } = req.body;
    if (!nome || !quantidade || !filial || !dataEntrada || !dataSaida) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    }

    db.run(`INSERT INTO produtos (nome, quantidade, filial, dataEntrada, dataSaida) VALUES (?, ?, ?, ?, ?)`,
        [nome, quantidade, filial, dataEntrada, dataSaida],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ id: this.lastID, nome, quantidade, filial, dataEntrada, dataSaida });
        }
    );
});

// Rota para excluir produto
app.delete('/produtos/:id', (req, res) => {
    const { id } = req.params;
    db.run('DELETE FROM produtos WHERE id = ?', id, function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Produto removido com sucesso' });
    });
});

// Iniciar servidor
app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));
