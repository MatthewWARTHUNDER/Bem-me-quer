const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();

app.use(express.json());
app.use(cors());


// Função para pegar o produto
app.get('/produtos', (req, res) => {
    db.query('SELECT * FROM produtos', (err, result) => {
        if (err) {
            return res.status(500).send('Erro ao buscar os produtos: ' + err);
        }
        res.status(200).json(result);
    });
});


// Pegar o produto pelo seu ID
app.get('/produtos/:id', (req, res) => {
    const { id } = req.params;
    db.query("SELECT * FROM produtos WHERE id = ?", [id], (err, results) => {
        if (err) return res.status(500).json({ erro: err });
        if (results.length === 0) return res.status(404).json({ erro: "Produto não encontrado" });
        res.json(results[0]);
    });
});

// Função para adicionar um produto
app.post('/produtos', (req, res) => {
    db.query("INSERT INTO produtos (nome, descricao, preco, imagem, categoria) VALUES (?, ?, ?, ?, ?)", [req.body.nome, req.body.descricao, req.body.preco, req.body.imagem, req.body.categoria], (err, results) => {
        if (err) {
            return res.status(500).send("Erro ao adicionar o produto: " + err.message);
        }
        res.status(201).send('Produto adicionado com sucesso!');
    });
})

// Função para atualizar um produto pelo seu ID
app.put('/produtos/:id', (req, res) => {
    const { id } = req.params;
    const { nome, descricao, preco, imagem, categoria } = req.body;

    db.query(
        "UPDATE produtos SET nome = ?, descricao = ?, preco = ?, imagem = ?, categoria = ? WHERE id = ?",
        [nome, descricao, preco, imagem, categoria, id],
        (err, results) => {
            if (err) {
                return res.status(500).send("Erro ao atualizar o produto:" + err.message);
            }
            if (results.affectedRows === 0) {
                return res.status(404).send("Produto não encontrado para atualizar.");
            }
            res.status(200).send("Produto atualizado com sucesso!");
        }
    );
});

// Função para deletar um produto pelo seu ID
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

// Fumção para cadastrar um pedido quando o cliente finalizar a compra
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
        return res.status(400).send("Dados incompletos do pedido.");
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

app.get('/pedidos/:id', (req, res) =>{
    const { id } = req.params;
    db.query('SELECT * FROM pedidos WHERE id = ?', [id] ,(err, result) => {
        if (err) {
            return res.status(500).send('Erro ao buscar os pedidos' + err);
        }
        res.status(200).json(result);
    })
})


app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});
