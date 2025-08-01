import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';

export default function Admin() {
    const [produtos, setProdutos] = useState([]);
    const [pedidos, setPedidos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [mensagem, setMensagem] = useState('');
    const [estoquesTemp, setEstoquesTemp] = useState({});
    const [produtoEditando, setProdutoEditando] = useState(null);
    const [pedidoSelecionado, setPedidoSelecionado] = useState(null);

    // Ref para a mensagem de sucesso
    const mensagemRef = useRef(null);
    // Ref para o formulário de edição
    const formularioEdicaoRef = useRef(null);

    const fetchProdutos = async () => {
        try {
            const res = await fetch('http://localhost:3000/produtos');
            const data = await res.json();
            setProdutos(data);

            const estoquesIniciais = {};
            data.forEach(p => {
                estoquesIniciais[p.id] = p.estoque;
            });
            setEstoquesTemp(estoquesIniciais);
        } catch (error) {
            alert('Erro ao buscar produtos');
        }
    };

    const Deletarproduto = (id) => {
        if (window.confirm("Tem certeza que deseja deletar este produto?")) {
            axios
                .delete(`http://localhost:3000/produtos/${id}`)
                .then(() => {
                    setProdutos(prev => prev.filter(p => p.id !== id));
                    setMensagem("Produto deletado com sucesso!");
                })
                .catch((err) => console.error("Erro ao deletar produto:", err));
        }
    };

    const Deletarpedido = (id) => {
        if (window.confirm("Tem certeza que deseja deletar este pedido?")) {
            axios
                .delete(`http://localhost:3000/pedidos/${id}`)
                .then(() => {
                    setPedidos(prev => prev.filter(p => p.id !== id));
                    setMensagem("Pedido deletado com sucesso!");
                })
                .catch((err) => {
                    console.error("Erro ao deletar o pedido: ", err);
                })
        }
    }

    const fetchPedidos = async () => {
        try {
            const res = await fetch('http://localhost:3000/pedidos');
            const data = await res.json();
            setPedidos(data);
        } catch (error) {
            alert('Erro ao buscar pedidos');
        }
    };

    useEffect(() => {
        Promise.all([fetchProdutos(), fetchPedidos()]).then(() => setLoading(false));
    }, []);

    // Scroll para mensagem de sucesso
    useEffect(() => {
        if (mensagem && mensagemRef.current) {
            mensagemRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, [mensagem]);

    const atualizarEstoque = async (id, novoEstoque) => {
        try {
            const res = await fetch(`http://localhost:3000/produtos/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ estoque: novoEstoque }),
            });
            if (!res.ok) throw new Error('Falha ao atualizar estoque');

            setProdutos((prev) =>
                prev.map((p) => (p.id === id ? { ...p, estoque: novoEstoque } : p))
            );
            setMensagem(`Produto ${id} atualizado com sucesso!`);
            setTimeout(() => setMensagem(''), 2000);
        } catch (error) {
            alert(error.message);
        }
    };

    const atualizarStatusPedido = async (id, novoStatus) => {
        try {
            const res = await fetch(`http://localhost:3000/pedidos/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: novoStatus }),
            });
            if (!res.ok) throw new Error('Falha ao atualizar status do pedido');

            setPedidos((prev) =>
                prev.map((p) => (p.id === id ? { ...p, status: novoStatus } : p))
            );
        } catch (error) {
            alert(error.message);
        }
    };

    const salvarEdicaoProduto = async () => {
        try {
            const res = await fetch(`http://localhost:3000/produtos/${produtoEditando.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(produtoEditando),
            });
            if (!res.ok) throw new Error('Erro ao salvar alterações');

            await fetchProdutos();
            setMensagem('Produto atualizado com sucesso!');
            setTimeout(() => setMensagem(''), 2000);
            setProdutoEditando(null);
        } catch (err) {
            alert(err.message);
        }
    };

    const buscarDetalhesPedido = async (id) => {
        try {
            const res = await fetch(`http://localhost:3000/pedidos/${id}`);
            const dados = await res.json();
            setPedidoSelecionado(dados);
        } catch (err) {
            alert('Erro ao buscar detalhes do pedido');
        }
    };

    if (loading) return <p>Carregando dados...</p>;

    return (
        <div className="p-4 max-w-5xl mx-auto">
            <h1 className="text-3xl mb-6">Painel Administrativo</h1>

            {/* Mensagem com ref para scroll */}
            {mensagem && (
                <div
                    ref={mensagemRef}
                    className="bg-green-500 text-white px-4 py-2 mb-4 rounded shadow"
                >
                    {mensagem}
                </div>
            )}

            {/* === PRODUTOS === */}
            <section className="mb-10">
                <h2 className="text-xl font-semibold mb-4">Produtos</h2>
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr>
                            <th className="border p-2">ID</th>
                            <th className="border p-2">Nome</th>
                            <th className="border p-2">Estoque</th>
                            <th className="border p-2">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {produtos.map(({ id, nome, estoque, descricao, preco }) => (
                            <tr key={id}>
                                <td className="border p-2">{id}</td>
                                <td className="border p-2">{nome}</td>
                                <td className="border p-2">
                                    <input
                                        type="number"
                                        value={estoquesTemp[id] ?? estoque}
                                        min="0"
                                        onChange={(e) =>
                                            setEstoquesTemp((prev) => ({
                                                ...prev,
                                                [id]: Number(e.target.value),
                                            }))
                                        }
                                        className="w-20 border border-gray-400 rounded p-1"
                                    />
                                </td>
                                <td className="border p-2 space-x-2">
                                    <button
                                        onClick={() => {
                                            const novoEstoque =
                                                estoquesTemp[id] !== undefined
                                                    ? estoquesTemp[id]
                                                    : estoque;
                                            atualizarEstoque(id, novoEstoque);
                                        }}
                                        className="bg-blue-500 text-white px-2 py-1 rounded"
                                    >
                                        Atualizar Estoque
                                    </button>
                                    <button
                                        onClick={() => {
                                            setProdutoEditando({ id, nome, descricao, preco });
                                            setTimeout(() => {
                                                formularioEdicaoRef.current?.scrollIntoView({
                                                    behavior: 'smooth',
                                                    block: 'start',
                                                });
                                            }, 100);
                                        }}
                                        className="bg-yellow-500 text-white px-2 py-1 rounded"
                                    >
                                        Editar
                                    </button>

                                    <button
                                        onClick={() => Deletarproduto(id)}
                                        className="bg-red-500 text-white px-2 py-1 rounded"
                                    >
                                        Deletar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>

            {/* === FORMULÁRIO DE EDIÇÃO === */}
            {produtoEditando && (
                <div
                    ref={formularioEdicaoRef}
                    className="mt-8 p-4 border rounded bg-gray-100"
                >
                    <h3 className="text-lg font-semibold mb-4">Editar Produto</h3>
                    <div className="mb-2">
                        <label className="block font-medium">Nome:</label>
                        <input
                            type="text"
                            value={produtoEditando.nome}
                            onChange={(e) =>
                                setProdutoEditando({ ...produtoEditando, nome: e.target.value })
                            }
                            className="w-full border p-2 rounded"
                        />
                    </div>
                    <div className="mb-2">
                        <label className="block font-medium">Descrição:</label>
                        <textarea
                            value={produtoEditando.descricao}
                            onChange={(e) =>
                                setProdutoEditando({
                                    ...produtoEditando,
                                    descricao: e.target.value,
                                })
                            }
                            className="w-full border p-2 rounded"
                        />
                    </div>
                    <div className="mb-2">
                        <label className="block font-medium">Preço (R$):</label>
                        <input
                            type="number"
                            step="0.01"
                            value={produtoEditando.preco}
                            onChange={(e) =>
                                setProdutoEditando({
                                    ...produtoEditando,
                                    preco: parseFloat(e.target.value),
                                })
                            }
                            className="w-full border p-2 rounded"
                        />
                    </div>
                    <button
                        onClick={salvarEdicaoProduto}
                        className="bg-green-600 text-white px-4 py-2 rounded"
                    >
                        Salvar
                    </button>
                    <button
                        onClick={() => setProdutoEditando(null)}
                        className="ml-2 bg-gray-400 text-white px-4 py-2 rounded"
                    >
                        Cancelar
                    </button>
                </div>
            )}

            {/* === PEDIDOS === */}
            <section className="mt-12">
                <h2 className="text-xl font-semibold mb-4">Pedidos</h2>
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr>
                            <th className="border p-2">ID</th>
                            <th className="border p-2">Cliente</th>
                            <th className="border p-2">Total</th>
                            <th className="border p-2">Status</th>
                            <th className="border p-2">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pedidos.map(({ id, nome_cliente, total, status }) => (
                            <tr key={id}>
                                <td className="border p-2">{id}</td>
                                <td className="border p-2">{nome_cliente}</td>
                                <td className="border p-2">R$ {Number(total).toFixed(2)}</td>
                                <td className="border p-2">{status}</td>
                                <td className="border p-2">
                                    <select
                                        value={status}
                                        onChange={(e) =>
                                            atualizarStatusPedido(id, e.target.value)
                                        }
                                        className="border rounded p-1"
                                    >
                                        <option value="Pendente">Pendente</option>
                                        <option value="Pago">Pago</option>
                                        <option value="Enviado">Enviado</option>
                                        <option value="Cancelado">Cancelado</option>
                                    </select>
                                    <button
                                        onClick={() => buscarDetalhesPedido(id)}
                                        className="bg-purple-500 text-white px-2 py-1 rounded ml-2"
                                    >
                                        Ver Detalhes
                                    </button>
                                    <button
                                        onClick={() => Deletarpedido(id)}
                                        className="bg-red-500 text-white px-2 py-1 rounded ml-2"
                                    >
                                        Deletar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>

            {/* === DETALHES DO PEDIDO === */}
            {pedidoSelecionado && (
                <div className="mt-8 p-4 border rounded bg-white shadow">
                    <h3 className="text-lg font-semibold mb-4">
                        Detalhes do Pedido #{pedidoSelecionado.id}
                    </h3>
                    <p>
                        <strong>Cliente:</strong> {pedidoSelecionado.nome_cliente}
                    </p>
                    <p>
                        <strong>Email:</strong> {pedidoSelecionado.email}
                    </p>
                    <p>
                        <strong>Telefone:</strong> {pedidoSelecionado.telefone}
                    </p>
                    <p>
                        <strong>Endereço:</strong> {pedidoSelecionado.endereco},{' '}
                        {pedidoSelecionado.cidade} - {pedidoSelecionado.estado}
                    </p>
                    <p>
                        <strong>CEP:</strong> {pedidoSelecionado.cep}
                    </p>
                    <p>
                        <strong>Status:</strong> {pedidoSelecionado.status}
                    </p>
                    <p>
                        <strong>Data de entrega:</strong>{' '}
                        {new Date(pedidoSelecionado.data_entrega).toLocaleDateString()}
                    </p>

                    {pedidoSelecionado.mensagem && (
                        <p>
                            <strong>Mensagem do Cliente:</strong> {pedidoSelecionado.mensagem}
                        </p>
                    )}

                    <h4 className="mt-4 font-semibold">Produtos:</h4>
                    <ul className="list-disc list-inside">
                        {pedidoSelecionado.produtos?.map((produto) => (
                            <li key={produto.id}>
                                {produto.nome_produto} — R$ {parseFloat(produto.preco).toFixed(2)}
                            </li>
                        ))}
                    </ul>
                    <button
                        onClick={() => setPedidoSelecionado(null)}
                        className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
                    >
                        Fechar Detalhes
                    </button>
                </div>
            )}
        </div>
    );
}
