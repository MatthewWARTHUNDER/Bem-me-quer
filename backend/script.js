const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();

app.use(express.json());
app.use(cors());

app.get('/produtos', (req, res) => {
    db.query('SELECT * FROM produtos', (err, result) => {
        if (err) {
            return res.status(500).send('Erro ao buscar os produtos: ' + err);
        }
        res.status(200).json(result);
    });
});

app.get('/produtos/:id', (req, res) => {
    const id = req.params.id;
    db.query("SELECT * FROM produtos WHERE id = ?", [id], (err, results) => {
        if (err) return res.status(500).json({ erro: err });
        if (results.length === 0) return res.status(404).json({ erro: "Produto não encontrado" });
        res.json(results[0]);
    });
});





app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});
