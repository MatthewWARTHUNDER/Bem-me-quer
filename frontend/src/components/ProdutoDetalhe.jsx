import Loader from "./Loader";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import mastercard from "../assets/mastercard.png";
import pix from "../assets/pix.png";

export default function ProdutoDetalhe() {
    const { id } = useParams();
    const [produto, setProduto] = useState(null);
    const [carregando, setCarregando] = useState(true);
    const [mensagem, setMensagem] = useState("");

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
        const carrinhoAtual = JSON.parse(localStorage.getItem("carrinho")) || [];
        const produtoExistente = carrinhoAtual.find(item => item.id === produto.id);

        if (!produtoExistente) {
            carrinhoAtual.push(produto);
            localStorage.setItem("carrinho", JSON.stringify(carrinhoAtual));
            mostrarMensagem("Produto adicionado ao carrinho!");
        } else {
            mostrarMensagem("Esse produto já está no carrinho.");
        }
    }

    if (carregando) return <Loader />;
    if (!produto) return <p>Produto não encontrado</p>;

    return (
        <section className="min-h-screen px-4 py-6 bg-gray-50">
            {mensagem && (
                <div className="fixed top-10 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded shadow z-50 text-sm">
                    {mensagem}
                </div>
            )}

            <div className="max-w-4xl mx-auto bg-white p-4 md:p-6 rounded-lg shadow-md grid grid-cols-1 md:grid-cols-2 gap-6">
                <img
                    src={`/images/${produto.imagem}`}
                    alt={produto.nome}
                    className="w-full max-h-[400px] object-cover rounded-md"
                />

                <div className="flex flex-col justify-between text-sm">
                    <div>
                        <h1 className="text-2xl font-semibold mb-1">{produto.nome}</h1>
                        <p className="text-gray-700 mb-2">{produto.descricao}</p>
                        <p className="text-gray-600 mb-2">Categoria: {produto.categoria}</p>
                        <p className="text-dourado text-xl font-bold mb-4">
                            R$ {Number(produto.preco).toFixed(2)}
                        </p>
                    </div>

                    <div className="space-y-3">
                        <button
                            onClick={() => adicionarAoCarrinho(produto)}
                            className="w-full bg-dourado text-white py-2 rounded-lg text-sm hover:bg-yellow-500 transition cursor-pointer"
                        >
                            Adicionar ao Carrinho
                        </button>


                        <div className="text-xs text-gray-600 mt-2">
                            <div className="flex gap-2 mt-2">
                                <img src={pix} className="h-20 ml-13" />
                                <img src={mastercard} className="h-20" />

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );


}
