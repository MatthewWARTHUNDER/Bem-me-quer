CREATE DATABASE BemMeQuer_DB;

USE BemMeQuer_DB;

CREATE TABLE produtos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    preco DECIMAL(10, 2) NOT NULL,
    imagem VARCHAR(255),
    categoria VARCHAR(50),
    estoque INT
);

CREATE TABLE admins(
	id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) UNIQUE NOT NULL,
    senha_hash VARCHAR(200) NOT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE pedidos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome_cliente VARCHAR(100),
    email VARCHAR(100),
    telefone VARCHAR(20),
    cep VARCHAR(10),
    endereco VARCHAR(255),
    cidade VARCHAR(100),
    estado VARCHAR(50),
    total DECIMAL(10,2),
	mensagem VARCHAR(255),
    status VARCHAR(50),
    data_entrega DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE itens_pedido (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pedido_id INT,
    produto_id INT,
    nome_produto VARCHAR(100),
    preco DECIMAL(10,2),
    quantidade INT,
    FOREIGN KEY (pedido_id) REFERENCES pedidos(id),
    FOREIGN KEY (produto_id) REFERENCES produtos(id)
);

INSERT INTO  produtos (nome, descricao, preco, imagem, categoria, estoque) VALUES(
 'Buquê de Rosas Vermelhas',
  'Buquê com 12 rosas vermelhas frescas, envolvidas em papel kraft com laço de cetim vermelho.',
  89.90,
  'FloresVermelhas.jpg',
  'buque',
   1
);

INSERT INTO produtos (nome, descricao, preco, imagem, categoria)
VALUES (
  'Orquídea Branca',
  'Orquídea branca em vaso de cerâmica elegante, perfeita para presentear.',
  120.00,
  'FloresNobres.jpg',
  'arranjomesas'
);


INSERT INTO produtos (nome, descricao, preco, imagem, categoria)
VALUES (
  'Roleta Russa',
  'Uma garrafa de roleta russa.',
  120.00,
  'orquidea-branca.jpg',
  'bomboniereEbebibas'
);

INSERT INTO produtos (nome, descricao, preco, imagem, categoria)
VALUES (
  'Presente de maternidade',
  'Um presente com flores e um leão.',
  170.00,
  'Maternidade.jpg',
  'maternidade'
);

INSERT INTO produtos (nome, descricao, preco, imagem, categoria) VALUES (
  'Arranjo de Flores Mistas',
  'Arranjo colorido com flores do campo.',
  95.00,
  'flores-mistas.jpg',
  'arranjomesas'
);

INSERT INTO produtos (nome, descricao, preco, imagem, categoria, estoque) VALUES (
  'Buquê com flores mistas',
  'Um buquê vibrante com flores mistas em tons de laranja, amarelo, vermelho e rosa. Perfeito para transmitir alegria, carinho e energia.',
  95.00,
  'BuqueMistas.jpg',
  'buque',
  5
);

INSERT INTO produtos (nome, descricao, preco, imagem, categoria, estoque) VALUES (
  'Buquê de rosas vermelhas e brancas',
  'Um delicado buquê de rosas vermelhas com flores brancas, envolto em papel vermelho e finalizado com um laço branco.',
  115.00,
  'BuqueRosacomBranco.jpg',
  'buque',
  3
  
);



/*Exibir os produtos na tabela */
SELECT * FROM produtos;
SELECT * FROM pedidos;
SELECT * FROM itens_pedido;
SELECT * FROM admins;

/*Selecionar os produtos pelos seus ID's*/
SELECT * FROM produtos WHERE id = 6 ;

/*Deletar a tabela produtos*/
DROP TABLE produtos;
DROP TABLE itens_pedido;
DROP TABLE pedidos;

/*Deletar os produtos na base do seu ID*/
DELETE  FROM produtos WHERE id = 6;
DELETE  FROM pedidos WHERE id = 5;
DELETE FROM admins where id =1;

/*Função para deletar o banco de dados*/
DROP DATABASE bemmequer_db;

/*Atualizar uma tabela existente*/
ALTER TABLE produtos ADD COLUMN estoque INT DEFAULT 0;
ALTER TABLE pedidos ADD COLUMN status VARCHAR(50) DEFAULT 'pendente';
ALTER TABLE pedidos ADD COLUMN mensagem TEXT;







