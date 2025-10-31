import Loader from "../components/Loader";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import mastercard from "../assets/mastercard.png";
import pix from "../assets/pix.png";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProdutosRelacionados from "../components/ProdutosRelacionados";
import BackButton from "../components/BackButton";
import axios from "axios";

export default function Produto() {
    const { id } = useParams();
    const [produto, setProduto] = useState(null);
    const [carregando, setCarregando] = useState(true);
    const [mensagem, setMensagem] = useState("");
    const [adicionando, setAdicionando] = useState(false);

    useEffect(() => {
        setCarregando(true);
        axios.get(`http://localhost:3000/produtos/${id}`)
            .then(res => {
                setProduto(res.data);
            })
            .catch(err => {
                console.error(err);
            })
            .finally(() => {
                setCarregando(false);
            });
    }, [id]);

    function mostrarMensagem(msg) {
        setMensagem(msg);
        setTimeout(() => {
            setMensagem("");
        }, 3000);
    }

    function adicionarAoCarrinho(produto) {
        const carrinhoAtual = JSON.parse(localStorage.getItem("carrinho")) || [];
        const produtoExistente = carrinhoAtual.find(item => item.id === produto.id);

        if (!produtoExistente) {
            carrinhoAtual.push(produto);
            localStorage.setItem("carrinho", JSON.stringify(carrinhoAtual));
            window.dispatchEvent(new Event("storage"));
            window.dispatchEvent(new Event("carrinhoAtualizado"));
            mostrarMensagem("Produto adicionado ao carrinho!");
        } else {
            mostrarMensagem("Esse produto já está no carrinho.");
        }
    }

    if (carregando) return <Loader />;
    if (!produto) return <p>Produto não encontrado</p>;

    return (
        <>
            <Navbar />
            <section className="min-h-screen px-4 py-6 bg-CorDeFundo">
                {mensagem && (
                    <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 text-base">
                        {mensagem}
                    </div>
                )}
                <BackButton />

                <div className="max-w-5xl mx-auto bg-white p-4 md:p-8 rounded-xl shadow-lg grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="w-full aspect-square bg-white rounded-lg overflow-hidden flex items-center justify-center">
                        <img
                            src={`/images/${produto.imagem}`}
                            alt={produto.nome}
                            className="w-full h-full object-cover rounded-lg"
                        />
                    </div>

                    <div className="flex flex-col justify-between">
                        <div>
                            <h1 className="text-3xl font-serif font-bold mb-2 text-gray-800">{produto.nome}</h1>
                            <p className="text-gray-500 mb-4">Categoria: {produto.categoria}</p>
                            <p className="text-gray-700 mb-4 leading-relaxed">{produto.descricao}</p>
                            <p className="text-3xl text-VerdeMusgo font-bold mb-6">
                                R$ {Number(produto.preco).toFixed(2)}
                            </p>
                        </div>

                        <div className="space-y-4">
                            <button
                                onClick={() => adicionarAoCarrinho(produto)}
                                disabled={produto.estoque === 0}
                                className={`w-full py-3 rounded-lg text-base font-semibold transition-colors duration-300 ${produto.estoque === 0
                                    ? 'bg-gray-400 text-white cursor-not-allowed'
                                    : 'bg-white border border-VerdeMusgo text-VerdeMusgo hover:bg-VerdeMusgo hover:text-white'
                                    }`}
                            >
                                {produto.estoque === 0 ? 'Produto Indisponível' : 'Adicionar ao Carrinho'}
                            </button>

                            {produto.estoque > 0 && produto.estoque <= 5 && (
                                <p className="text-red-600 text-sm text-center">Restam apenas {produto.estoque} unidades!</p>
                            )}

                            <div className="flex flex-col items-center gap-2 pt-4 border-t">
                                <div className="flex justify-center items-center gap-4">
                                    <img src={pix} alt="Pix" className="h-12" />
                                    <img src={mastercard} alt="Mastercard" className="h-12" />
                                </div>
                                <p className="text-center text-xs text-gray-500 mt-2">
                                     <span className="font-semibold text-red-600">Atenção:</span> {/*Pagamento com cartão somente na loja.<br /> */}
                                    Taxa de entrega pode ser aplicada.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <ProdutosRelacionados produtoId={produto.id} />
            </section >
            <Footer />
        </>
    );
}