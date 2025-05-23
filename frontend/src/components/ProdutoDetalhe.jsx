import Loader from "./Loader";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import mastercard from "../assets/mastercard.png";
import pix from "../assets/pix.png";
import ProdutosRelacionados from './ProdutosRelacionados.jsx'


export default function ProdutoDetalhe() {
    const { id } = useParams();
    const [produto, setProduto] = useState(null);
    const [carregando, setCarregando] = useState(true);
    const [mensagem, setMensagem] = useState("");
    const [adicionando, setAdicionando] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            fetch(`http://localhost:3000/produtos/${id}`)
                .then((res) => res.json())
                .then((data) => {
                    setProduto(data);
                    setCarregando(false);
                })
                .catch((err) => {
                    console.error(err);
                    setCarregando(false);
                });
        }, 1000);
    }, [id]);

    function mostrarMensagem(msg) {
        setMensagem(msg);
        setTimeout(() => {
            setMensagem("");
        }, 3000);
    }

    function adicionarAoCarrinho(produto) {
        setAdicionando(true);

        setTimeout(() => {
            const carrinhoAtual = JSON.parse(localStorage.getItem("carrinho")) || [];
            const produtoExistente = carrinhoAtual.find(item => item.id === produto.id);

            if (!produtoExistente) {
                carrinhoAtual.push(produto);
                localStorage.setItem("carrinho", JSON.stringify(carrinhoAtual));
                window.dispatchEvent(new Event("storage"));
                mostrarMensagem("Produto adicionado ao carrinho!");
                window.dispatchEvent(new Event("carrinhoAtualizado"));
                mostrarMensagem("Produto adicionado ao carrinho!");
            } else {
                mostrarMensagem("Esse produto já está no carrinho.");
            }

            setAdicionando(false);
        }, 2000);
    }



    if (carregando) return <Loader />;
    if (adicionando) return <Loader />;
    if (!produto) return <p>Produto não encontrado</p>;

    return (
        <section className="min-h-screen px-4 py-6 bg-gray-50">
            {mensagem && (
                <div className="fixed top-10 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded shadow z-50 text-sm">
                    {mensagem}
                </div>
            )}

            <div className="max-w-4xl mx-auto bg-white p-4 md:p-6 rounded-lg shadow-md grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Imagem mobile */}
                <div className="md:hidden w-full aspect-[4/3] bg-white rounded-md overflow-hidden flex items-center justify-center">
                    <img
                        src={`/images/${produto.imagem}`}
                        alt={produto.nome}
                        className="w-full h-full object-contain rounded-md"
                    />
                </div>


                {/* Imagem desktop */}
                <div className="hidden md:block">
                    <img
                        src={`/images/${produto.imagem}`}
                        alt={produto.nome}
                        className="w-full h-auto max-h-[400px] object-cover rounded-md"
                    />
                </div>




                <div className="flex flex-col justify-between text-sm">
                    <div>
                        <h1 className="text-2xl font-semibold mb-1">{produto.nome}</h1>
                        <p className="text-gray-700 mb-2">{produto.descricao}</p>
                        <p className="text-gray-600 mb-2">Categoria: {produto.categoria}</p>
                        <p className="text-gray-600 mb-2 font-black">Estoque disponível: {produto.estoque}</p>
                        <p className="text-dourado text-xl font-bold mb-4">
                            R$ {Number(produto.preco).toFixed(2)}
                        </p>
                    </div>

                    <div className="space-y-3">
                        <button
                            onClick={() => adicionarAoCarrinho(produto)}
                            disabled={produto.estoque === 0}
                            className={`w-full py-2 rounded-lg text-sm text-white transition cursor-pointer ${produto.estoque === 0
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-dourado hover:bg-yellow-500'
                                }`}
                        >
                            {produto.estoque === 0 ? 'Produto Indisponível' : 'Adicionar ao Carrinho'}
                        </button>

                        {produto.estoque === 0 && (
                            <p className="text-red-600 text-sm mt-2">Este produto está atualmente fora de estoque.</p>
                        )}


                        <div className="flex justify-center items-center gap-4 mt-4">
                            <img src={pix} alt="Pix" className="h-16" />
                            <img src={mastercard} alt="Mastercard" className="h-16" />
                        </div>
                    </div>
                </div>
            </div>
            <ProdutosRelacionados produtoId={produto.id} />

        </section >
    );


}
