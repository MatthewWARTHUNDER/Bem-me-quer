import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";


export default function ProdutoDetalhe() {
    const { id } = useParams();
    const [produto, setProduto] = useState(null);
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
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
    }, [id]);


    function adicionarAoCarrinho(produto) {
        const carrinhoAtual = JSON.parse(localStorage.getItem("carrinho")) || [];

        const produtoExistente = carrinhoAtual.find(item => item.id === produto.id);
        if (!produtoExistente) {
            carrinhoAtual.push(produto);
            localStorage.setItem("carrinho", JSON.stringify(carrinhoAtual));
            alert("Produto adicionado ao carrinho!");
        } else {
            alert("Esse produto já está no carrinho.");
        }
    }

    if (carregando) return <p>Carregando...</p>;
    if (!produto) return <p>Produto não encontrado</p>;

    return (
        <section className="min-h-screen px-6 py-10 bg-gray-50">
            <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow">
                <img src={`/images/${produto.imagem}`} alt={produto.nome} className="w-full h-80 object-cover rounded-md mb-4" />
                <h1 className="text-3xl font-bold mb-2">{produto.nome}</h1>
                <p className="text-gray-700 mb-4">{produto.descricao}</p>
                <p className="text-gray-700 mb-4">Categoria: {produto.categoria}</p>
                <p className="text-dourado text-xl font-bold">R$ {Number(produto.preco).toFixed(2)}</p>
                <button
                    onClick={() => adicionarAoCarrinho(produto)}
                    className="bg-dourado text-white px-4 py-2 rounded mt-4 cursor-pointer"
                >
                    Adicionar ao Carrinho
                </button>
            </div>
        </section>
    );
}
