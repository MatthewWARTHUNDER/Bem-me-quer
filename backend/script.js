const express = require('express');
const cors = require('cors');
const db = require('./db');
const bcrypt = require('bcrypt');

const senha = "admin123";
const saltRounds = 10;
const app = express();

// const para armazenar a senha do admin e o seu nome
const NewAdmin = {
    nome: "Franciele",
    senha: "Pastel 10"

};

app.use(express.json());
app.use(cors());



// const para criptografar a senha do admin ao banco de dados
const senhaCriptografada = bcrypt.hashSync(NewAdmin.senha, 10);



// Processor para gerar o hash(criptografar) a senha do admin
bcrypt.hash(senha, saltRounds, (err, hash) => {
    if (err){
        console.eror("erro ao gerar o hash:", err)
    } else {
        console.log("Hash gerado com sucesso:", hash)
    }
});

// Depois de gerar o hash, insere o admin ao banco de dados
db.query(
    "INSERT INTO admins (nome, senha_hash) VALUES (?, ?)",
    [NewAdmin.nome, senhaCriptografada],
    (err) => {
        if (err){
            console.error("Erro ao inserir o admin:", err);

        } else {
            console.log("Admin inseriro com sucesso ao banco de dados!")
        }
    }
)


// Buscar todos os produtos
app.get('/produtos', (req, res) => {
    db.query('SELECT * FROM produtos', (err, result) => {
        if (err) {
            return res.status(500).send('Erro ao buscar os produtos: ' + err);
        }
        res.status(200).json(result);
    });
});

// Buscar produto por ID
app.get('/produtos/:id', (req, res) => {
    const { id } = req.params;
    db.query("SELECT * FROM produtos WHERE id = ?", [id], (err, results) => {
        if (err) return res.status(500).json({ erro: err });
        if (results.length === 0) return res.status(404).json({ erro: "Produto não encontrado" });
        res.json(results[0]);
    });
});

// Adicionar produto com estoque
app.post('/produtos', (req, res) => {
    const { nome, descricao, preco, imagem, categoria, estoque } = req.body;

    db.query(
        "INSERT INTO produtos (nome, descricao, preco, imagem, categoria, estoque) VALUES (?, ?, ?, ?, ?, ?)",
        [nome, descricao, preco, imagem, categoria, estoque],
        (err, results) => {
            if (err) {
                return res.status(500).send("Erro ao adicionar o produto: " + err.message);
            }
            res.status(201).send('Produto adicionado com sucesso!');
        }
    );
});

// Atualizar produto por ID (incluindo estoque)
app.put('/produtos/:id', (req, res) => {
    const { id } = req.params;
    const { estoque } = req.body;

    const query = 'UPDATE produtos SET estoque = ? WHERE id = ?';
    db.query(query, [estoque, id], (err, result) => {
        if (err) {
            console.error('Erro ao atualizar o estoque:', err);
            return res.status(500).json({ error: 'Erro ao atualizar o estoque' });
        }

        return res.status(200).json({ message: 'Estoque atualizado com sucesso' });
    });
});

// Deletar produto por ID
app.delete('/produtos/:id', (req, res) => {
    const { id } = req.params;

    db.query("DELETE FROM produtos WHERE id = ?", [id], (err, result) => {
        if (err) {
            return res.status(500).send("Erro ao deletar o produto: " + err.message);
        }

        if (result.affectedRows === 0) {
            return res.status(404).send("Produto não encontrado.");
        }

        res.status(200).send("Produto deletado com sucesso!");
    });
});

// Criar pedido
app.post('/pedidos', (req, res) => {
    const {
        nome_cliente,
        email,
        telefone,
        cep,
        endereco,
        cidade,
        estado,
        total,
        produtos
    } = req.body;

    if (!nome_cliente || !email || !telefone || !cep || !endereco || !cidade || !estado || !total || !produtos) {
        return res.status(400).send("Dados incompletos do pedido, por favor preenche todos os campos!");
    }

    const sqlPedido = `INSERT INTO pedidos 
    (nome_cliente, email, telefone, cep, endereco, cidade, estado, total) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

    db.query(sqlPedido, [nome_cliente, email, telefone, cep, endereco, cidade, estado, total], (err, resultPedido) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Erro ao salvar o pedido.");
        }

        const pedidoId = resultPedido.insertId;

        const sqlItens = `INSERT INTO itens_pedido (pedido_id, produto_id, nome_produto, preco) VALUES ?`;

        const valoresItens = produtos.map(produto => [
            pedidoId,
            produto.produto_id,
            produto.nome_produto,
            produto.preco
        ]);

        db.query(sqlItens, [valoresItens], (errItens) => {
            if (errItens) {
                console.error(errItens);
                return res.status(500).send("Erro ao salvar os itens do pedido.");
            }

            res.status(201).send({ mensagem: "Pedido criado com sucesso!", pedidoId });
        });
    });
});

// Buscar pedido por ID
app.get('/pedidos/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM pedidos WHERE id = ?', [id], (err, result) => {
        if (err) {
            return res.status(500).send('Erro ao buscar os pedidos: ' + err);
        }
        res.status(200).json(result);
    });
});

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});
