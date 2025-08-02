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

INSERT INTO produtos (nome, descricao, preco, imagem, categoria, estoque) VALUES(
	'Mimo Maternidade',
    'Box com tampa - vira organizador, mini urso, ferreiro rocher, mix de flores da semana',
    174.00,
    'maternidade.jpg',
    'maternidade',
    2
);

INSERT INTO produtos (nome, descricao, preco, imagem, categoria, estoque) VALUES(
	'Box formatura',
    'Box personalizado com simbolo do curso ou nome',
    299.00,
    'Formatura.jpg',
    'formatura',
    2
);

INSERT INTO produtos (nome, descricao, preco, imagem, categoria, estoque) VALUES (
  'Buquê M - Rosas e girassóis',
  'Um delicado buquê de rosas vermelhas com girassóis, envolto em papel de preferência e finalizado com um laço de preferência.',
  299.00,
  'BuqueRosacomBranco.jpg',
  'buque',
  3
  
);

INSERT INTO produtos (nome, descricao, preco, imagem, categoria, estoque) VALUES (
  'Box girassol',
  'Box com tampa, estilo livro, personalize a tampa com nome ou frase, jack daniels e girassóis.',
  339.00,
  'BoxDaniel.jpg',
  'box',
  4
  
);


INSERT INTO produtos (nome, descricao, preco, imagem, categoria, estoque) VALUES (
  'Maternidade báu G',
  'Acompanhado com urso hipoalérgico G, Bau G, Flores, Itens de higiene, chocolates nobres e acabamentos finos (Consulte cores)',
  389.00,
  'MaternidadeBauG.jpg',
  'maternidade',
  3
  
);

INSERT INTO produtos (nome, descricao, preco, imagem, categoria, estoque) VALUES (
  'Buquê de rosas brancas',
  'Um delicado buquê de rosas com flores brancas, envolto em papel de preferência e finalizado com um laço de preferência.',
  289.00,
  'BuqueRosacomBranco.jpg',
  'buque',
  3
  
);


INSERT INTO produtos (nome, descricao, preco, imagem, categoria, estoque) VALUES (
  'Box flores + mini espumante',
  'Um box acompanhado com flores e mini espumante',
  359.00,
  'BoxEspumante.jpg',
  'box',
  3
  
);

INSERT INTO produtos (nome, descricao, preco, imagem, categoria, estoque) VALUES (
  'Box basic',
  'Um box acompanhado com cesta de metal, vinho argentino, ferrero rocher e orquídea.',
  378.00,
  'BoxBasic.jpg',
  'box',
  2
  
);

INSERT INTO produtos (nome, descricao, preco, imagem, categoria, estoque) VALUES (
  'Box mimo',
  'Box com tampa, mix de flores da semana e acompanha cartão.',
  149.00,
  'BoxMimo.jpg',
  'box',
  2
  
);

INSERT INTO produtos (nome, descricao, preco, imagem, categoria, estoque) VALUES (
  'Box Super GG - Flores Nobres',
  'Super box de flores nobres, tamanho GG, acompanha cartão',
  689.00,
  'BoxSuperGGFloresNobres.jpg',
  'box',
  2
  
);

INSERT INTO produtos (nome, descricao, preco, imagem, categoria, estoque) VALUES (
  'Box premium orquídea',
  'Descrição a fazer.',
  399.00,
  'BoxPremiumOrquidea.jpg',
  'box',
  5
  
);

INSERT INTO produtos (nome, descricao, preco, imagem, categoria, estoque) VALUES (
  'Maternidade',
  'Box M acompanhado com mini urso, chocolate, mix de flores e balão personalizado (consulte cores).',
  279.00,
  'MaternidadeM.jpg',
  'box',
  2
  
);

INSERT INTO produtos (nome, descricao, preco, imagem, categoria, estoque) VALUES (
  'Buquê P com balão',
  'Buquê P com mix de flores e balão personalizado(nome ou frases com até 3 palavras).',
  279.00,
  'BuquePcomBalao.jpg',
  'buque',
  3
  
);

INSERT INTO produtos (nome, descricao, preco, imagem, categoria, estoque) VALUES (
  'Box rosas',
  'Box tampa livro, pode personalizar frase e nome, acompanhado com rosas e ferreiro rocher.',
  448.00,
  'BoxRosas.jpg',
  'box',
  2
  
);

INSERT INTO produtos (nome, descricao, preco, imagem, categoria, estoque) VALUES (
  'Petit',
  'Box PP com rosas, mini urso e chocolates (cor variada do box).',
  149.00,
  'BoxRosas.jpg',
  'box',
  2
  
);

INSERT INTO produtos (nome, descricao, preco, imagem, categoria, estoque) VALUES (
  'Box premium love',
  'Box com balão, flores, chocolate e perfume EGEO(oboticário).',
  529.00,
  'BoxPremiumLove.jpg',
  'box',
  2
  
);

INSERT INTO produtos (nome, descricao, preco, imagem, categoria, estoque) VALUES (
  'Box whisky',
  'Box de flores acompanhado com whsky jack daniels.',
  359.00,
  'BoxWhisky.jpg',
  'box',
  2
  
);

INSERT INTO produtos (nome, descricao, preco, imagem, categoria, estoque) VALUES (
  'buque 12 rosas',
  'Buquê com 12 rosas',
  289.00,
  'Buque12rosas.jpg',
  'buque',
  2
  
);

INSERT INTO produtos (nome, descricao, preco, imagem, categoria, estoque) VALUES (
  'Box raio de sol',
  'O Box Raio de Sol acompanha um arranjo floral com girassóis e flores amarelas, um sabonete de glicerina artesanal, um sabonete líquido perfumado e uma embalagem decorativa tipo box.',
  279.00,
  'BoxRaiodeSol.jpg',
  'box',
  2
  
);

INSERT INTO produtos (nome, descricao, preco, imagem, categoria, estoque) VALUES (
  'buquê flores nobres G',
  'O Buquê Flores Nobres G é composto por flores selecionadas de alta qualidade, com combinação elegante de tons e espécies nobres. Acompanha folhagens, acabamento em papel especial e laço decorativo.',
  399.00,
  'BuqueFloresNobresG.jpg',
  'buque',
  4
  
);

INSERT INTO produtos (nome, descricao, preco, imagem, categoria, estoque) VALUES (
  'Box de flores - teste',
  'Somente teste',
  399.00,
  'BoxFloresRosa.jpeg',
  'box',
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







