import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function ProdutosRelacionados({ produtoId }) {
    const [produtos, setProdutos] = useState([]);

    useEffect(() => {
        if (!produtoId) return;

        const apiUrl = `http://localhost:3000/produtos-relacionados/${produtoId}`;

        axios.get(apiUrl)
            .then(res => {
                if (Array.isArray(res.data)) {
                    setProdutos(res.data);
                } else {
                    setProdutos([]);
                }
            })
            .catch(err => {
                console.error("Erro ao buscar produtos relacionados:", err);
                setProdutos([]);
            });
    }, [produtoId]);

    if (produtos.length === 0) {
        return null;
    }

    return (
        <section className="w-full py-16">
            <div className="max-w-6xl mx-auto px-4">
                <h2 className="text-4xl font-serif text-VerdeMusgo text-center mb-10">
                    Você também pode gostar
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {produtos.map((p) => (
                        <div
                            key={p.id}
                            className="group bg-white rounded-lg shadow-md overflow-hidden flex flex-col hover:shadow-xl transition-shadow duration-300"
                        >
                            <Link to={`/produto/${p.id}`} className="block overflow-hidden">
                                <img
                                    src={`/images/${p.imagem}`}
                                    alt={p.nome}
                                    className="w-full h-56 object-cover transition-transform duration-300"
                                />
                            </Link>

                            <div className="p-4 flex flex-col flex-grow">
                                <h3 className="text-lg font-semibold text-gray-800 mb-1 flex-grow truncate">
                                    {p.nome}
                                </h3>
                                <p className="text-xl text-VerdeMusgo font-bold my-3">
                                    R$ {Number(p.preco).toFixed(2)}
                                </p>
                                <Link
                                    to={`/produto/${p.id}`}
                                    className="block text-center bg-white border border-VerdeMusgo text-VerdeMusgo w-full py-2 rounded-md font-semibold transition-colors duration-300 hover:bg-VerdeMusgo hover:text-white"
                                >
                                    Ver produto
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}