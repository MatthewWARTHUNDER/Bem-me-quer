import React, { useEffect, useState } from 'react';

export default function Admin() {
    const [produtos, setProdutos] = useState([]);
    const [pedidos, setPedidos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [mensagem, setMensagem] = useState('');
    const [estoquesTemp, setEstoquesTemp] = useState({});

    // Buscar produtos
    const fetchProdutos = async () => {
        try {
            const res = await fetch('http://localhost:3000/produtos');
            const data = await res.json();
            setProdutos(data);
        } catch (error) {
            alert('Erro ao buscar produtos');
        }
    };

    // Buscar pedidos
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

    // Atualizar estoque
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
            setTimeout(() => setMensagem(''), 3000);
        } catch (error) {
            alert(error.message);
        }
    };

    // Atualizar status do pedido
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

    if (loading) return <p>Carregando dados...</p>;

    return (
        <div className="p-4 max-w-5xl mx-auto">
            <h1 className="text-3xl mb-6">Painel Administrativo</h1>

            {mensagem && (
                <div className="bg-green-500 text-white px-4 py-2 mb-4 rounded shadow">
                    {mensagem}
                </div>
            )}

            <section className="mb-10">
                <h2 className="text-xl font-semibold mb-4">Produtos</h2>
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr>
                            <th className="border border-gray-300 p-2">ID</th>
                            <th className="border border-gray-300 p-2">Nome</th>
                            <th className="border border-gray-300 p-2">Estoque</th>
                            <th className="border border-gray-300 p-2">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {produtos.map(({ id, nome, estoque }) => (
                            <tr key={id}>
                                <td className="border border-gray-300 p-2">{id}</td>
                                <td className="border border-gray-300 p-2">{nome}</td>
                                <td className="border border-gray-300 p-2">
                                    <input
                                        type="number"
                                        defaultValue={estoque}
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
                                <td className="border border-gray-300 p-2">
                                    <button
                                        onClick={() => {
                                            const novoEstoque =
                                                estoquesTemp[id] !== undefined
                                                    ? estoquesTemp[id]
                                                    : estoque;
                                            atualizarEstoque(id, novoEstoque);
                                        }}
                                        className="bg-blue-500 text-white px-3 py-1 rounded"
                                    >
                                        Atualizar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>

            <section>
                <h2 className="text-xl font-semibold mb-4">Pedidos</h2>
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr>
                            <th className="border border-gray-300 p-2">ID</th>
                            <th className="border border-gray-300 p-2">Cliente</th>
                            <th className="border border-gray-300 p-2">Total</th>
                            <th className="border border-gray-300 p-2">Status</th>
                            <th className="border border-gray-300 p-2">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pedidos.map(({ id, nome_cliente, total, status }) => (
                            <tr key={id}>
                                <td className="border border-gray-300 p-2">{id}</td>
                                <td className="border border-gray-300 p-2">{nome_cliente}</td>
                                <td className="border border-gray-300 p-2">R$ {total.toFixed(2)}</td>
                                <td className="border border-gray-300 p-2">{status}</td>
                                <td className="border border-gray-300 p-2">
                                    <select
                                        value={status}
                                        onChange={(e) => atualizarStatusPedido(id, e.target.value)}
                                        className="border border-gray-400 rounded p-1"
                                    >
                                        <option value="Pendente">Pendente</option>
                                        <option value="Pago">Pago</option>
                                        <option value="Enviado">Enviado</option>
                                        <option value="Cancelado">Cancelado</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </div>
    );
}
