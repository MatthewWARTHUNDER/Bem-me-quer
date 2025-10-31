import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import AdminNavbar from "../../components/admin/AdminNavbar";
import { Link } from "react-router-dom";

export default function AdminPut() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [produto, setProduto] = useState(null);

    useEffect(() => {
        const fetchProduto = async () => {
            try {
                const res = await axios.get(`http://localhost:3000/produtos/${id}`);
                setProduto(res.data);
            } catch (err) {
                console.error("Erro ao buscar produto:", err);
            }
        };
        fetchProduto();
    }, [id]);

    const salvarProduto = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3000/produtos/${id}`, produto);
            alert("Produto atualizado com sucesso!");
            navigate("/admin/produtos");
        } catch (err) {
            console.error("Erro ao atualizar produto:", err);
            alert("Erro ao atualizar produto.");
        }
    };

    if (!produto) return <div className="text-center p-10">Carregando...</div>;

    return (
        <div className="bg-gray-100 min-h-screen">
            <AdminNavbar />
            <main className="p-6">
                <form onSubmit={salvarProduto} className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-md">
                    <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Editar Produto</h1>

                    {produto.imagem && (
                        <img
                            src={`/images/${produto.imagem}`}
                            alt={produto.nome}
                            className="w-full h-64 object-cover rounded-lg mb-6"
                        />
                    )}

                    <div className="space-y-6">
                        <div>
                            <label className="block mb-1 font-semibold text-gray-700">Nome:</label>
                            <input
                                type="text"
                                value={produto.nome}
                                onChange={(e) => setProduto({ ...produto, nome: e.target.value })}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-VerdeMusgo"
                                required
                            />
                        </div>
                        <div>
                            <label className="block mb-1 font-semibold text-gray-700">Descrição:</label>
                            <textarea
                                value={produto.descricao}
                                onChange={(e) => setProduto({ ...produto, descricao: e.target.value })}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-VerdeMusgo"
                                rows={4}
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block mb-1 font-semibold text-gray-700">Preço (R$):</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    value={produto.preco}
                                    onChange={(e) => setProduto({ ...produto, preco: e.target.value })}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-VerdeMusgo"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block mb-1 font-semibold text-gray-700">Estoque:</label>
                                <input
                                    type="number"
                                    value={produto.estoque}
                                    onChange={(e) => setProduto({ ...produto, estoque: e.target.value })}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-VerdeMusgo"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-4 mt-8">
                        <button
                            type="submit"
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-full shadow-sm text-base font-medium text-white bg-VerdeMusgo hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-VerdeMusgo disabled:bg-gray-400"
                        >
                            Salvar Alterações
                        </button>
                        <Link
                            to="/admin/produtos"
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-full shadow-sm text-base font-medium text-white bg-gray-500 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
                        >
                            Cancelar
                        </Link>
                    </div>
                </form>
            </main>
        </div>
    );
}