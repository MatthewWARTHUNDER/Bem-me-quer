import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminNavbar from "../../components/admin/AdminNavbar";
import axios from "axios";
import { Link } from "react-router-dom";

export default function AdminDelete() {
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

    const deletarProduto = async () => {
        try {
            await axios.delete(`http://localhost:3000/produtos/${id}`);
            alert("Produto deletado com sucesso!");
            navigate("/AdminGet");
        } catch (err) {
            console.error("Erro ao deletar produto:", err);
            alert("Erro ao deletar produto.");
        }
    };

    if (!produto) return <div className="text-center p-10">Carregando...</div>;

    return (
        <div className="bg-gray-100 min-h-screen">
            <AdminNavbar />
            <main className="p-6 flex items-center justify-center">
                <div className="max-w-lg mx-auto bg-white p-8 rounded-xl shadow-md text-center">
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">Confirmar Exclusão</h1>
                    
                    <p className="text-gray-600 mb-6">
                        Você tem certeza que deseja deletar permanentemente o produto?
                    </p>

                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
                        <img
                            src={`/images/${produto.imagem}`}
                            alt={produto.nome}
                            className="w-32 h-32 object-cover rounded-full mx-auto mb-4"
                        />
                        <p className="font-bold text-xl text-gray-800">{produto.nome}</p>
                    </div>

                    <div className="flex gap-4">
                        <button
                            onClick={deletarProduto}
                            className="flex-1 bg-red-600 text-white font-bold py-3 rounded-lg hover:bg-red-700 transition-colors"
                        >
                            Sim, Deletar
                        </button>
                        <Link
                            to="/AdminGet"
                            className="flex-1 bg-gray-500 text-white font-bold py-3 rounded-lg hover:bg-gray-600 transition-colors text-center"
                        >
                            Cancelar
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
}