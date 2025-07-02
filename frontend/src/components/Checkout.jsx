import React, { useState, useEffect } from 'react';

export default function Checkout() {
    const [carrinho, setCarrinho] = useState([]);

    const [email, setEmail] = useState('');
    const [nome, setNome] = useState('');
    const [sobrenome, setSobrenome] = useState('');
    const [cep, setCep] = useState('');
    const [endereco, setEndereco] = useState('');
    const [complemento, setComplemento] = useState('');
    const [cidade, setCidade] = useState('');
    const [estado, setEstado] = useState('');
    const [telefone, setTelefone] = useState('');
    const [dataEntrega, setDataEntrega] = useState('');
    const [mensagemCliente, setMensagemCliente] = useState('');

    useEffect(() => {
        const produtosCarrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
        setCarrinho(produtosCarrinho);
    }, []);

    const calcularTotal = () => {
        return carrinho.reduce((acc, produto) => {
            return acc + Number(produto.preco);
        }, 0).toFixed(2);
    };

    const enviarPedido = async () => {
        const produtosPedido = carrinho.map(produto => ({
            produto_id: produto.id,
            nome_produto: produto.nome,
            preco: Number(produto.preco)
        }));

        const pedido = {
            nome_cliente: `${nome} ${sobrenome}`.trim(),
            email,
            telefone,
            cep,
            endereco: `${endereco} ${complemento}`.trim(),
            cidade,
            estado,
            data_entrega: dataEntrega,
            total: Number(calcularTotal()),
            mensagem: mensagemCliente, 
            produtos: produtosPedido
        };

        try {
            const resposta = await fetch('http://localhost:3000/pedidos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(pedido)
            });

            if (!resposta.ok) {
                const erro = await resposta.text();
                alert('Erro ao enviar pedido: ' + erro);
                return;
            }

            const dados = await resposta.json();
            alert(`Pedido enviado com sucesso! ID do pedido: ${dados.pedidoId}`);

            localStorage.removeItem('carrinho');
            setCarrinho([]);

        } catch (error) {
            alert('Erro na conexão com o servidor: ' + error.message);
        }
    };

    return (
        <div className="min-h-screen bg-white text-gray-900">
            <header className="text-center py-8 border-b">
                <h1 className="text-3xl font-light tracking-widest">Bem-Me-Quer</h1>
            </header>

            <main className="max-w-6xl mx-auto p-4 grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Formulário */}
                <div className="md:col-span-2 space-y-6">
                    <div>
                        <h2 className="text-lg font-semibold mb-2">Insira seu contato</h2>
                        <input
                            type="email"
                            placeholder="E-mail"
                            className="w-full border p-3 rounded-md"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold mb-2">
                            Informações para onde seu produto será enviado:
                        </h2>
                        <div className="grid grid-cols-2 gap-4">
                            <input
                                type="text"
                                placeholder="Nome"
                                className="border p-3 rounded-md"
                                value={nome}
                                onChange={e => setNome(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="Sobrenome"
                                className="border p-3 rounded-md"
                                value={sobrenome}
                                onChange={e => setSobrenome(e.target.value)}
                            />
                        </div>
                        <input
                            type="text"
                            placeholder="CEP"
                            className="w-full border p-3 mt-4 rounded-md"
                            value={cep}
                            onChange={e => setCep(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Rua e número"
                            className="w-full border p-3 mt-2 rounded-md"
                            value={endereco}
                            onChange={e => setEndereco(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Complemento (opcional)"
                            className="w-full border p-3 mt-2 rounded-md"
                            value={complemento}
                            onChange={e => setComplemento(e.target.value)}
                        />
                        <div className="grid grid-cols-2 gap-4 mt-2">
                            <input
                                type="text"
                                placeholder="Cidade"
                                className="border p-3 rounded-md"
                                value={cidade}
                                onChange={e => setCidade(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="Estado"
                                className="border p-3 rounded-md"
                                value={estado}
                                onChange={e => setEstado(e.target.value)}
                            />
                        </div>

                        {/* 📅 Campo de data */}
                        <input
                            type="date"
                            className="w-full border p-3 mt-2 rounded-md"
                            value={dataEntrega}
                            onChange={e => setDataEntrega(e.target.value)}
                        />

                        <input
                            type="tel"
                            placeholder="Telefone"
                            className="w-full border p-3 mt-2 rounded-md"
                            value={telefone}
                            onChange={e => setTelefone(e.target.value)}
                        />
                    </div>
                    <textarea
                        placeholder="Deixe uma mensagem ou observações para o pedido"
                        className="w-full border p-3 mt-2 rounded-md"
                        rows={4}
                        value={mensagemCliente}
                        onChange={e => setMensagemCliente(e.target.value)} />
                </div>

                {/* Resumo do pedido */}
                <aside className="bg-gray-50 p-6 rounded-md shadow-sm">
                    {carrinho.map(produto => (
                        <div key={produto.id} className="flex items-center gap-4 mb-4">
                            <img
                                src={`/images/${produto.imagem}`}
                                alt={produto.nome}
                                className="w-16 h-16 object-cover rounded"
                            />
                            <div>
                                <p className="text-sm">{produto.nome}</p>
                                <p className="text-sm font-semibold mt-1">R$ {Number(produto.preco).toFixed(2)}</p>
                            </div>
                        </div>
                    ))}

                    <div className="text-sm text-gray-700 border-t pt-4 space-y-1">
                        <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span>R$ {calcularTotal()}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Frete</span>
                            <span>Inserir CEP</span>
                        </div>
                        <div className="flex justify-between font-bold text-black pt-2">
                            <span>Total</span>
                            <span>R$ {calcularTotal()}</span>
                        </div>
                    </div>

                    <button
                        className="w-full bg-dourado text-white py-3 rounded-md mt-6 hover:bg-yellow-500 transition"
                        onClick={enviarPedido}
                    >
                        Enviar pedido
                    </button>
                </aside>
            </main>
        </div>
    );
}