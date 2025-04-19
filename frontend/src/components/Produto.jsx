import { useSearchParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import FloresNobres from "../assets/FloresNobres.jpg";
import FloresVermelhas from "../assets/FloresVermelhas.jpg";
import Hearts from "../assets/Hearts.jpg";
import Maternidade from "../assets/Maternidade.jpg";

// Produtos de exemplo
const produtos = [
    { id: 1, nome: "Buquê Vermelho", categoria: "buque", preco: 120, imagem: FloresVermelhas },
    { id: 2, nome: "Flores Nobres", categoria: "arranjomesas", preco: 150, imagem: FloresNobres },
    { id: 3, nome: "Box Rosas & Chocolate", categoria: "box", preco: 250, imagem: Hearts },
    { id: 4, nome: "Mimo Maternidade", categoria: "maternidade", preco: 200, imagem: Maternidade },
    { id: 5, nome: "Vaso de Flores Silvestres", categoria: "vasos", preco: 180, imagem: FloresNobres },
    { id: 6, nome: "Flores para Ele", categoria: "paraeles", preco: 130, imagem: FloresNobres },
    { id: 7, nome: "Arranjo de Agradecimento", categoria: "agradecimento", preco: 140, imagem: FloresNobres },
    { id: 8, nome: "Flores de Formatura", categoria: "formatura", preco: 160, imagem: FloresNobres },
    { id: 9, nome: "Bomboniere & Bebidas", categoria: "bomboniere&bebibas", preco: 220, imagem: FloresNobres },
];

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
    { label: "Bomboniere & Bebidas", value: "bomboniere&bebibas" },
];

export default function Loja() {
    const [searchParams, setSearchParams] = useSearchParams();
    const categoria = searchParams.get("categoria");

    const [produtosFiltrados, setProdutosFiltrados] = useState(produtos);

    useEffect(() => {
        if (categoria) {
            setProdutosFiltrados(produtos.filter(p => p.categoria === categoria));
        } else {
            setProdutosFiltrados(produtos);
        }
    }, [categoria]);

    return (
        <section className="min-h-screen px-6 py-10 bg-gray-50">
            <h2 className="text-3xl font-bold text-center mb-8">Nossa Loja</h2>

            <div className="flex gap-10">
                {/* Sidebar de Categorias */}
                <aside className="w-1/4">
                    <h3 className="text-lg font-semibold mb-4">Categorias</h3>
                    <ul className="space-y-2">
                        {categorias.map((cat) => (
                            <li key={cat.value}>
                                <Link
                                    to={cat.value ? `?categoria=${cat.value}` : ""}
                                    className={`block px-4 py-2 rounded-md hover:bg-dourado hover:text-white transition ${
                                        categoria === cat.value ? "bg-dourado text-white" : "text-gray-700"
                                    }`}
                                >
                                    {cat.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </aside>

                {/* Produtos */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-3/4">
                    {produtosFiltrados.map((produto) => (
                        <div key={produto.id} className="bg-white p-4 rounded-xl shadow hover:shadow-md transition">
                            <img src={produto.imagem} alt={produto.nome} className="w-full h-48 object-cover rounded-md mb-3" />
                            <h3 className="text-xl font-semibold mb-2">{produto.nome}</h3>
                            <p className="text-gray-600 mb-2">Categoria: {produto.categoria}</p>
                            <p className="text-dourado font-bold">R$ {produto.preco.toFixed(2)}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
