import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Cart() {
    const [carrinho, setCarrinho] = useState([]);
    const [mensagem, setMensagem] = useState("");

    useEffect(() => {
        const produtosCarrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
        setCarrinho(produtosCarrinho);
    }, []);

    const removerProduto = (id) => {
        const novosProdutos = carrinho.filter(produto => produto.id !== id);
        setCarrinho(novosProdutos);
        localStorage.setItem('carrinho', JSON.stringify(novosProdutos));
        mostrarMensagem("Produto removido do carrinho!");
    };

    const calcularTotal = () => {
        const total = carrinho.reduce((acc, produto) => {
            return acc + Number(produto.preco);
        }, 0);
        return total.toFixed(2);
    };

    const mostrarMensagem = (mensagem) => {
        setMensagem(mensagem);
        setTimeout(() => {
            setMensagem("");
        }, 3000);
    };

    return (
        <section className="min-h-screen px-6 py-10 bg-gray-50">
            {mensagem && (
                <div className="fixed top-30 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-6 py-3 rounded shadow-lg z-50 transition-opacity duration-300">
                    {mensagem}
                </div>
            )}

            <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow">
                <h1 className="text-3xl font-bold mb-6">Carrinho de Compras</h1>

                {carrinho.length === 0 ? (
                    <p className="text-lg text-gray-500">
                        Seu carrinho está vazio, que tal dar uma olhada na nossa loja?{' '}
                        <Link to="/Loja" className="text-dourado underline">Loja</Link>
                    </p>
                ) : (
                    <div>
                        <ul className="space-y-4">
                            {carrinho.map(produto => (
                                <li key={produto.id} className="flex justify-between items-center">
                                    <div className="flex gap-4">
                                        <img
                                            src={`/images/${produto.imagem}`}
                                            alt={produto.nome}
                                            className="w-16 h-16 object-cover rounded"
                                        />
                                        <div>
                                            <h2 className="font-bold">{produto.nome}</h2>
                                            <p className="text-sm text-gray-500">{produto.descricao}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className="text-xl font-semibold">
                                            R$ {Number(produto.preco).toFixed(2)}
                                        </span>
                                        <button
                                            onClick={() => removerProduto(produto.id)}
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            Remover
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>

                        <div className="mt-6 flex justify-between items-center">
                            <span className="text-xl font-semibold">Total: R$ {calcularTotal()}</span>
                            <Link to="/Checkoutpage"
                                className="bg-dourado text-white hover:bg-yellow-500 px-6 py-3 rounded-md hover:bg-dourado-dark focus:outline-none cursor-pointer"
                            >
                                Finalizar Compra
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
