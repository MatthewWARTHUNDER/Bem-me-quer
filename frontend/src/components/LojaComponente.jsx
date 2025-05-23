import { useSearchParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";

const categorias = [
    { label: "Todos", value: "" },
    { label: "Buquê", value: "buque" },
    { label: "Arranjos de Mesa", value: "arranjomesas" },
    { label: "Box de Flores", value: "box" },
    { label: "Maternidade", value: "maternidade" },
    { label: "Flores em Vasos", value: "vasos" },
    { label: "Para Eles", value: "paraeles" },
    { label: "Agradecimento", value: "agradecimento" },
    { label: "Formatura", value: "formatura" },
    { label: "Bomboniere & Bebidas", value: "bomboniereEbebibas" },
];

export default function Loja() {
    const [searchParams] = useSearchParams();
    const categoria = searchParams.get("categoria");

    const [produtos, setProdutos] = useState([]);
    const [produtosFiltrados, setProdutosFiltrados] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/produtos")
            .then(res => res.json())
            .then(data => setProdutos(data))
            .catch(err => console.error("Erro ao carregar produtos:", err));
    }, []);

    useEffect(() => {
        if (categoria) {
            setProdutosFiltrados(produtos.filter(p => p.categoria === categoria));
        } else {
            setProdutosFiltrados(produtos);
        }
    }, [categoria, produtos]);

    return (
        <section className="min-h-screen px-6 py-10 bg-gray-50">
            <h2 className="text-3xl font-bold text-center mb-8">Nossa Loja</h2>

            <div className="flex gap-10">
                <aside className="w-1/4">
                    <h3 className="text-lg font-semibold mb-4">Categorias</h3>
                    <ul className="space-y-2">
                        {categorias.map((cat) => (
                            <li key={cat.value}>
                                <Link
                                    to={cat.value ? `?categoria=${cat.value}` : ""}
                                    className={`block px-4 py-2 rounded-md hover:bg-dourado hover:text-white transition ${categoria === cat.value ? "bg-dourado text-white" : "text-gray-700"
                                        }`}
                                >
                                    {cat.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </aside>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-3/4">
                    {produtosFiltrados.map((produto) => (
                        <Link to={`/produto/${produto.id}`} key={produto.id}>
                            <div className="bg-white p-4 rounded-xl shadow hover:shadow-md transition cursor-pointer">
                                <img
                                    src={`http://localhost:5173/images/${produto.imagem}`}
                                    alt={produto.nome}
                                    className="w-full h-48 object-cover rounded-md mb-3"
                                />
                                <h3 className="text-lg font-semibold mb-2">{produto.nome}</h3>
                                <p className="text-gray-600 mb-2">Categoria: {produto.categoria}</p>
                                <p className="text-dourado font-bold">R$ {Number(produto.preco).toFixed(2)}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
