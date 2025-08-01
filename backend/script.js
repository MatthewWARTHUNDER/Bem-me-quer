const express = require('express');
const cors = require('cors');
const db = require('./db');
const bcrypt = require('bcrypt');
const path = require('path');
const senha = "";
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
    if (err) {
        console.error("erro ao gerar o hash:", err)
    } else {
        console.log("Hash gerado com sucesso:", hash)
    }
});

// Depois de gerar o hash, insere o admin ao banco de dados
db.query(
    "INSERT INTO admins (nome, senha_hash) VALUES (?, ?)",
    [NewAdmin.nome, senhaCriptografada],
    (err) => {
        if (err) {
            console.error("Erro ao inserir o admin:", err);

        } else {
            console.log("Admin inseriro com sucesso ao banco de dados!")
        }
    }
)


// REQUISIÇÕES HTTP


// Pegar os produtos relacionados na base do seu id
app.get('/produtos-relacionados/:id', (req, res) => {
    const { id } = req.params;


    db.query("SELECT categoria FROM produtos WHERE id = ?", [id], (err, resultCategoria) => {
        if (err) {
            console.error("Erro ao buscar categoria do produto:", err);
            return res.status(500).json({ erro: 'Erro ao buscar categoria' });
        }

        if (resultCategoria.length === 0) {
            return res.status(404).json({ erro: 'Produto não encontrado' });
        }

        const categoria = resultCategoria[0].categoria;


        const queryRelacionados = `
            SELECT * FROM produtos
            WHERE id != ? AND categoria = ?
            ORDER BY RAND() LIMIT 4
        `;

        db.query(queryRelacionados, [id, categoria], (err, resultRelacionados) => {
            if (err) {
                console.error("Erro ao buscar produtos relacionados:", err);
                return res.status(500).json({ erro: 'Erro ao buscar produtos relacionados' });
            }

            res.status(200).json(resultRelacionados);
        });
    });
});







// Rota para o login do admin
app.post('/admin/login', (req, res) => {
    const { nome, senha } = req.body;

    db.query("SELECT * FROM admins WHERE nome = ?", [nome], (err, results) => {
        if (err) return res.status(500).json({ erro: "Erro no servidor." });
        if (results.length === 0) return res.status(401).json({ erro: "Admin não encontrado" });

        const admin = results[0];

        bcrypt.compare(senha, admin.senha_hash, (err, result) => {
            if (err) return res.status(500).json({ erro: "Erro ao verificar senha" });

            if (result) {

                return res.status(200).json({ mensagem: "Login bem-sucedido" });
            } else {
                return res.status(401).json({ erro: "Senha incorreta" });
            }
        });
    });
});



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

// Adicionar produto 
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
    const campos = [];
    const valores = [];

    for (const [chave, valor] of Object.entries(req.body)) {
        campos.push(`${chave} = ?`);
        valores.push(valor);
    }

    if (campos.length === 0) {
        return res.status(400).json({ error: 'Nenhum campo para atualizar' });
    }

    const query = `UPDATE produtos SET ${campos.join(', ')} WHERE id = ?`;
    valores.push(id);

    db.query(query, valores, (err, result) => {
        if (err) {
            console.error('Erro ao atualizar o produto', err);
            return res.status(500).json({ error: 'Erro ao atualizar o produto' });
        }

        return res.status(200).send({ message: 'Produto atualizado com sucesso' });
    });
});

app.put('/pedidos/:id', (req, res) => {
    const { id } = req.params;
    const campos = [];
    const valores = [];

    console.log('Dados para atualizar:', req.body);

    for (const [chave, valor] of Object.entries(req.body)) {
        campos.push(`${chave} = ?`);
        valores.push(valor);
    }

    if (campos.length === 0) {
        return res.status(400).json({ error: 'Nenhum campo para atualizar' });
    }

    const query = `UPDATE pedidos SET ${campos.join(', ')} WHERE id = ?`;
    valores.push(id);

    db.query(query, valores, (err, result) => {
        if (err) {
            console.error('Erro ao atualizar o pedido:', err);
            return res.status(500).json({ error: 'Erro ao atualizar o pedido' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Pedido não encontrado' });
        }

        res.status(200).json({ message: 'Pedido atualizado com sucesso' });
    });
});


// Deletar produto por ID
app.delete('/produtos/:id', (req, res) => {
    const { id } = req.params;

    // Primeiro remove os itens relacionados
    db.query("DELETE FROM itens_pedido WHERE produto_id = ?", [id], (err) => {
        if (err) {
            console.error("Erro ao deletar itens relacionados:", err);
            return res.status(500).send("Erro ao deletar itens relacionados.");
        }

        // Depois deleta o produto
        db.query("DELETE FROM produtos WHERE id = ?", [id], (err, result) => {
            if (err) {
                console.error("Erro ao deletar produto:", err);
                return res.status(500).send("Erro ao deletar produto.");
            }

            if (result.affectedRows === 0) {
                return res.status(404).send("Produto não encontrado.");
            }

            res.status(200).send("Produto deletado com sucesso!");
        });
    });
});


// Deletar pedido por ID
// app.delete('/pedidos/:id', (req, res) => {
//     const { id } = req.params;

//     // Primeiro, deletar itens do pedido
//     db.query("DELETE FROM itens_pedido WHERE pedido_id = ?", [id], (err) => {
//         if (err) {
//             console.error("Erro ao deletar itens do pedido:", err);
//             return res.status(500).send("Erro ao deletar itens do pedido.");
//         }

//         // Depois, deletar o pedido
//         db.query("DELETE FROM pedidos WHERE id = ?", [id], (err, result) => {
//             if (err) {
//                 console.error("Erro ao deletar o pedido:", err);
//                 return res.status(500).send("Erro ao deletar o pedido.");
//             }

//             res.status(200).send("Pedido deletado com sucesso!");
//         });
//     });
// });


// Criar pedido realizado no checkout
// app.post('/pedidos', (req, res) => {

//     const {
//         nome_cliente,
//         email,
//         telefone,
//         cep,
//         endereco,
//         cidade,
//         estado,
//         total,
//         mensagem,
//         produtos
//     } = req.body;

//     const mensagemFinal = mensagem?.trim() || "Sem mensagem";
//     if (!nome_cliente || !email || !telefone || !cep || !endereco || !cidade || !estado || !total || !produtos) {
//         return res.status(400).send("Dados incompletos do pedido, por favor preenche todos os campos!");
//     }

//     const sqlPedido = `INSERT INTO pedidos 
//     (nome_cliente, email, telefone, cep, endereco, cidade, estado, mensagem, total) 
//     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

//     db.query(sqlPedido, [nome_cliente, email, telefone, cep, endereco, cidade, estado, mensagem, total], (err, resultPedido) => {
//         if (err) {
//             console.error(err);
//             return res.status(500).send("Erro ao salvar o pedido.");
//         }

//         const pedidoId = resultPedido.insertId;

//         const sqlItens = `INSERT INTO itens_pedido (pedido_id, produto_id, nome_produto, preco) VALUES ?`;

//         const valoresItens = produtos.map(produto => [
//             pedidoId,
//             produto.produto_id,
//             produto.nome_produto,
//             produto.preco
//         ]);

//         db.query(sqlItens, [valoresItens], (errItens) => {
//             if (errItens) {
//                 console.error(errItens);
//                 return res.status(500).send("Erro ao salvar os itens do pedido.");
//             }

//             res.status(201).send({ mensagem: "Pedido criado com sucesso!", pedidoId });
//         });
//     });
// });


// Pegar o pedido no painel ADM
app.get('/pedidos', (req, res) => {
    db.query('SELECT * FROM pedidos', (err, result) => {
        if (err) {
            return res.status(500).send('Erro ao buscar os pedidos' + err);
        }
        res.status(200).json(result)
    })
})

// Buscar pedido por ID
app.get('/pedidos/:id', (req, res) => {
    const { id } = req.params;


    db.query('SELECT * FROM pedidos WHERE id = ?', [id], (err, pedidoResult) => {
        if (err) {
            return res.status(500).send('Erro ao buscar o pedido: ' + err);
        }

        if (pedidoResult.length === 0) {
            return res.status(404).send('Pedido não encontrado');
        }


        db.query('SELECT * FROM itens_pedido WHERE pedido_id = ?', [id], (err, itensResult) => {
            if (err) {
                return res.status(500).send('Erro ao buscar itens do pedido: ' + err);
            }


            const pedido = {
                ...pedidoResult[0],
                produtos: itensResult
            };

            res.status(200).json(pedido);
        });
    });
});


app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});
