CREATE DATABASE BemMeQuer_DB;

USE BemMeQuer_DB;

CREATE TABLE produtos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    preco DECIMAL(10, 2) NOT NULL,
    imagem VARCHAR(255),
    categoria VARCHAR(50)
);

INSERT INTO  produtos (nome, descricao, preco, imagem, categoria) VALUES(
 'Buquê de Rosas Vermelhas',
  'Buquê com 12 rosas vermelhas frescas, envolvidas em papel kraft com laço de cetim vermelho.',
  89.90,
  'buque-rosas.jpg',
  'buque'
);

INSERT INTO produtos (nome, descricao, preco, imagem, categoria)
VALUES (
  'Orquídea Branca',
  'Orquídea branca em vaso de cerâmica elegante, perfeita para presentear.',
  120.00,
  'orquidea-branca.jpg',
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
  'omaternidade.jpg',
  'maternidade'
);



SELECT * FROM produtos;
SELECT * FROM produtos WHERE id = 1 ;

DROP TABLE produtos;

DELETE  from produtos WHERE id = 3;

DROP DATABASE bemmequer_db;



