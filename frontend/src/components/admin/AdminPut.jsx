import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import AdminNavbar from "./AdminNavbar";
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
                alert("Erro ao buscar produto.");
            }
        };
        fetchProduto();
    }, [id]);

    const salvarProduto = async () => {
        try {
            await axios.put(`http://localhost:3000/produtos/${id}`, produto);
            alert("Produto atualizado com sucesso!");
            navigate("/AdminGet");
        } catch (err) {
            console.error("Erro ao atualizar produto:", err);
            alert("Erro ao atualizar produto.");
        }
    };

    if (!produto) return <p>Carregando produto...</p>;

    return (
        <>
            <AdminNavbar />
            <div className="p-10 max-w-2xl mx-auto">
                <h1 className="text-2xl font-bold mb-4 text-center">Editar Produto</h1>

                <div className="bg-white shadow rounded-lg p-4 flex flex-col items-center max-w-xs mx-auto">
                    <img
                        src={`http://localhost:5173/images/${produto.imagem}`}
                        alt={produto.nome}
                        className="w-full h-48 rounded-md mb-3 object-cover"
                    />


                    <label className="block mb-2 font-semibold">Nome:</label>
                    <input
                        type="text"
                        value={produto.nome}
                        onChange={(e) => setProduto({ ...produto, nome: e.target.value })}
                        className="w-full p-2 border rounded mb-4"
                    />

                    <label className="block mb-2 font-semibold">Descrição:</label>
                    <textarea
                        value={produto.descricao}
                        onChange={(e) => setProduto({ ...produto, descricao: e.target.value })}
                        className="w-full p-2 border rounded mb-4"
                        rows={5}
                        placeholder="Digite a descrição do produto"
                    />


                    <label className="block mb-2 font-semibold">Preço:</label>
                    <input
                        type="number"
                        value={produto.preco}
                        onChange={(e) => setProduto({ ...produto, preco: e.target.value })}
                        className="w-full p-2 border rounded mb-4"
                    />

                    <label className="block mb-2 font-semibold">Estoque:</label>
                    <input
                        type="number"
                        value={produto.estoque}
                        onChange={(e) => setProduto({ ...produto, estoque: e.target.value })}
                        className="w-full p-2 border rounded mb-4"
                    />

                    <div className="flex gap-4 mt-4">
                        <button
                            onClick={salvarProduto}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                        >
                            Salvar
                        </button>
                        <Link
                            to="/AdminGet"
                            className="flex-1 bg-gray-400 text-white py-2 rounded hover:bg-gray-500 text-center"
                        >
                            Cancelar, voltar a pagina de produtos
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
