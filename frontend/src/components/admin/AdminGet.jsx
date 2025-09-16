import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";

export default function AdminGet() {
    const [produtos, setProdutos] = useState([]);

    useEffect(() => {

        axios
            .get("http://localhost:3000/produtos")
            .then((res) => setProdutos(res.data))
            .catch((err) => console.error("Erro ao carregar produtos:", err));
    }, []);

    return (
        <>
        <AdminNavbar />
        <div className="p-6 max-w-6xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Gerenciar Produtos</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {produtos.map((p) => (
                    <div
                        key={p.id}
                        className="bg-white shadow rounded-lg p-4 flex flex-col"
                    >
                        <img
                            src={`http://localhost:5173/images/${p.imagem}`}
                            alt={p.nome}
                            className="w-full h-40 object-cover rounded-md mb-3"
                        />
                        <h2 className="font-semibold text-lg line-clamp-2">{p.nome}</h2>
                        <p className="text-gray-500 text-sm">R$ {Number(p.preco).toFixed(2)}</p>
                        <p className="text-sm">Estoque: {p.estoque}</p>

                        <div className="mt-auto flex gap-2 pt-3">

                            <Link
                                to={`/AdminPut/${p.id}`}
                                className="flex-1 text-center bg-blue-500 text-white py-1 rounded hover:bg-blue-600"
                            >
                                Editar
                            </Link>
                            <Link
                                to={`/AdminDelete/${p.id}`}
                                className="flex-1 text-center bg-red-500 text-white py-1 rounded hover:bg-red-600"
                            >
                                Deletar
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        </>
    );
}
