import { useSearchParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BackButton from "../components/BackButton";
import axios from "axios";

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
    const navigate = useNavigate();

    const [produtos, setProdutos] = useState([]);
    const [produtosFiltrados, setProdutosFiltrados] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3000/produtos")
            .then(res => setProdutos(res.data))
            .catch(err => console.error("Erro ao carregar produtos:", err));
    }, []);

    useEffect(() => {
        if (categoria) {
            setProdutosFiltrados(produtos.filter(p => p.categoria === categoria));
        } else {
            setProdutosFiltrados(produtos);
        }
    }, [categoria, produtos]);

    function handleSelectChange(e) {
        const valor = e.target.value;
        navigate(valor ? `?categoria=${valor}` : '/loja');
    }

    return (
        <>
            <Navbar />
            <section className="min-h-screen px-4 py-10 ">
                <div className="max-w-7xl mx-auto">
                    <BackButton />
                    <h2 className="text-5xl font-vibes text-VerdeMusgo text-center mb-10">Nossa Loja</h2>

                    <div className="flex flex-col sm:flex-row gap-8">

                        <div className="sm:hidden px-2">
                            <label htmlFor="categoria-select" className="sr-only">Filtrar categoria</label>
                            <select
                                id="categoria-select"
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-VerdeMusgo"
                                value={categoria || ""}
                                onChange={handleSelectChange}
                            >
                                {categorias.map(cat => (
                                    <option key={cat.value} value={cat.value}>{cat.label}</option>
                                ))}
                            </select>
                        </div>


                        <aside className="hidden sm:block sm:w-1/4 lg:w-1/5">
                            <h3 className="text-xl font-semibold mb-4 text-gray-800">Categorias</h3>
                            <ul className="space-y-2">
                                {categorias.map((cat) => (
                                    <li key={cat.value}>
                                        <Link
                                            to={cat.value ? `?categoria=${cat.value}` : "/loja"}
                                            className={`block px-4 py-2 rounded-md transition-colors duration-200 
                                            ${(categoria === cat.value) || (!categoria && !cat.value)
                                                    ? "bg-VerdeMusgo text-white font-semibold"
                                                    : "text-gray-700 hover:bg-VerdeMusgo/10"
                                                }`}
                                        >
                                            {cat.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </aside>


<div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                            {produtosFiltrados.map((produto) => (
                                <div
                                    key={produto.id}
                                    className="group bg-white rounded-lg shadow-md overflow-hidden flex flex-col hover:shadow-xl transition-shadow duration-300"
                                >
                                    <Link to={`/produto/${produto.id}`} className="block overflow-hidden">
                                        <img
                                            src={`/images/${produto.imagem}`}
                                            alt={produto.nome}
                                            className="w-full h-56 object-cover transition-transform duration-300"
                                        />
                                    </Link>

                                    <div className="p-4 flex flex-col flex-grow">
                                        <h3 className="text-lg font-semibold text-gray-800 mb-1 flex-grow">
                                            {produto.nome}
                                        </h3>
                                        <p className="text-xl text-VerdeMusgo font-bold my-3">
                                            R$ {Number(produto.preco).toFixed(2)}
                                        </p>
                                        <Link
                                            to={`/produto/${produto.id}`}
                                            className="block text-center bg-white border border-VerdeMusgo text-VerdeMusgo w-full py-2 rounded-md font-semibold transition-colors duration-300 hover:bg-VerdeMusgo hover:text-white"
                                        >
                                            Ver produto
                                        </Link>
                                    </div>

                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}