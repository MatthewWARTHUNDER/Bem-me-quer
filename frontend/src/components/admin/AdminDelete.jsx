import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";
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
                alert("Erro ao buscar produto.");
            }
        };
        fetchProduto();
    }, [id]);

    const deletarProduto = async () => {
        try {
            await axios.delete(`http://localhost:3000/produtos/${id}`);
            alert("Produto deletado com sucesso!"); 
            navigate("/AdminGet");;
        } catch (err) {
            console.error("Erro ao deletar produto:", err);
            alert("Erro ao deletar produto.");
        }
    };

    if (!produto) return <p>Carregando produto...</p>;

    return (
        <>
        <AdminNavbar/>
        <div className="p-6 max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold mb-4 text-center">Deletar Produto</h1>

                            <div className="bg-white shadow rounded-lg p-4 flex flex-col items-center max-w-xs mx-auto">
                    <img
                        src={`http://localhost:5173/images/${produto.imagem}`}
                        alt={produto.nome}
                        className="w-full h-48 rounded-md mb-3 object-cover"
                    />
            <p>Você realmente deseja deletar o produto <strong>{produto.nome}</strong>?</p>
            <div className="mt-4 flex gap-4">
                <button
                    onClick={deletarProduto}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                >
                    Deletar
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
