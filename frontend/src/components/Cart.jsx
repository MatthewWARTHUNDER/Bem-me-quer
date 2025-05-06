import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Cart() {
    const [carrinho, setCarrinho] = useState([]);

    useEffect(() => {

        const produtosCarrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
        setCarrinho(produtosCarrinho);
    }, []);

    const removerProduto = (id) => {

        const novosProdutos = carrinho.filter(produto => produto.id !== id);
        setCarrinho(novosProdutos);
        localStorage.setItem('carrinho', JSON.stringify(novosProdutos));
    };

    const calcularTotal = () => {
        const total = carrinho.reduce((acc, produto) => {
            return acc + Number(produto.preco);
        }, 0);
        return total.toFixed(2);
    };

    return (
        <section className="min-h-screen px-6 py-10 bg-gray-50">
            <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow">
                <h1 className="text-3xl font-bold mb-6">Carrinho de Compras</h1>

                {carrinho.length === 0 ? (
                    <p className="text-lg text-gray-500">Seu carrinho está vazio, que tal dar uma olhada na nossa loja? <Link to="/Loja" className="text-dourado text underline">Loja</Link></p>
                ) : (
                    <div>
                        <ul className="space-y-4">
                            {carrinho.map(produto => (
                                <li key={produto.id} className="flex justify-between items-center">
                                    <div>
                                        <h2 className="font-bold">{produto.nome}</h2>
                                        <p className="text-sm text-gray-500">{produto.descricao}</p>
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
                            <button className="bg-dourado text-white px-6 py-3 rounded-md hover:bg-dourado-dark focus:outline-none cursor-pointer">
                                Finalizar Compra
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
