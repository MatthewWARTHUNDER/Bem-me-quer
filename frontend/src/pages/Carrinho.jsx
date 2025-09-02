import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Loader from "../components/Loader";

export default function Carrinho() {
    const [carrinho, setCarrinho] = useState([]);
    const [mensagem, setMensagem] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const produtosCarrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
        setCarrinho(produtosCarrinho);
    }, []);

    const removerProduto = (id) => {
        setLoading(true);

        setTimeout(() => {
            const novosProdutos = carrinho.filter(produto => produto.id !== id);
            setCarrinho(novosProdutos);
            localStorage.setItem('carrinho', JSON.stringify(novosProdutos));

            window.dispatchEvent(new Event('carrinhoAtualizado'));

            setLoading(false);
            mostrarMensagem("Produto removido do carrinho!");
        }, 500);
    };

    const calcularTotal = () => {
        const total = carrinho.reduce((acc, produto) => acc + Number(produto.preco), 0);
        return total.toFixed(2);
    };

    const mostrarMensagem = (mensagem) => {
        setMensagem(mensagem);
        setTimeout(() => setMensagem(""), 3000);
    };

    function finalizarCompraWhatsapp() {
        if (carrinho.length === 0) {
            mostrarMensagem("Seu carrinho está vazio!");
            return;
        }

        const numeroWhatsapp = "555499179427";

        const listaProdutos = carrinho
            .map(produto => `- ${produto.nome} (R$ ${Number(produto.preco).toFixed(2)})`)
            .join("\n");

        const mensagem = `Olá! Gostaria de consultar os seguintes produtos:\n${listaProdutos}\n\nEles estão disponíveis?`;

        const url = `https://wa.me/${numeroWhatsapp}?text=${encodeURIComponent(mensagem)}`;
        window.open(url, "_blank");
    }

    return (
        <>
            <Navbar />
            <section className="min-h-screen px-4 sm:px-6 py-10 bg-gray-50">
                {loading && <Loader />}

                {mensagem && (
                    <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-6 py-3 rounded shadow-lg z-50 transition-opacity duration-300 text-center text-sm sm:text-base">
                        {mensagem}
                    </div>
                )}

                <div className="max-w-4xl mx-auto bg-white p-6 sm:p-8 rounded-xl shadow">
                    <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center sm:text-left">Carrinho de Compras</h1>

                    {carrinho.length === 0 ? (
                        <p className="text-lg text-gray-500 text-center sm:text-left">
                            Seu carrinho está vazio, que tal dar uma olhada na nossa{' '}
                            <Link to="/Loja" className="text-dourado underline">loja</Link>?
                        </p>
                    ) : (
                        <div className="space-y-6">
                            <ul className="space-y-4">
                                {carrinho.map(produto => (
                                    <li key={produto.id} className="flex flex-col sm:flex-row justify-between items-center gap-4 border-b pb-4">
                                        <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left w-full sm:w-auto">
                                            <img
                                                src={`/images/${produto.imagem}`}
                                                alt={produto.nome}
                                                className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-lg"
                                            />
                                            <div>
                                                <h2 className="font-bold text-base sm:text-lg">{produto.nome}</h2>
                                                <p className="text-sm text-gray-500">{produto.descricao}</p>
                                            </div>
                                        </div>
                                        <div className="flex  flex-col sm:flex-row items-center gap-2">
                                            <span className="text-lg font-semibold">
                                                R$ {Number(produto.preco).toFixed(2)}
                                            </span>
                                            <button
                                                onClick={() => removerProduto(produto.id)}
                                                className="text-red-500 hover:text-red-700 text-sm sm:text-base"
                                            >
                                                Remover
                                            </button>
                                        </div>
                                    </li>
                                ))}
                            </ul>

                            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 border-t pt-4">
                                <span className="text-xl font-semibold">Total: R$ {calcularTotal()}</span>

                                <button
                                    onClick={finalizarCompraWhatsapp}
                                    className="bg-dourado hover:bg-yellow-500 text-white px-6 py-3 rounded-md focus:outline-none w-full sm:w-auto"
                                >
                                    Consultar pedido via WhatsApp
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </section>
            <Footer />
        </>
    );
}