import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";
import BackToAdminPanelButton from "../admin/BackToAdminPanelButton";

export default function AdminGet() {
    const [produtos, setProdutos] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:3000/produtos")
            .then((res) => setProdutos(res.data))
            .catch((err) => console.error("Erro ao carregar produtos:", err));
    }, []);

    return (
        <div className="bg-gray-100 min-h-screen">
            <AdminNavbar />
            <main className="p-6 max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Gerenciar Produtos</h1>
                    <BackToAdminPanelButton />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {produtos.map((p) => (
                        <div
                            key={p.id}
                            className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col group"
                        >
                            <img
                                src={`/images/${p.imagem}`}
                                alt={p.nome}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-4 flex flex-col flex-grow">
                                <h2 className="font-bold text-lg text-gray-800 mb-1">{p.nome}</h2>
                                <p className="text-VerdeMusgo font-semibold mb-2">R$ {Number(p.preco).toFixed(2)}</p>
                                <p className="text-sm text-gray-600">Estoque: {p.estoque}</p>

                                <div className="mt-auto flex gap-3 pt-4">
                                    <Link
                                        to={`/AdminPut/${p.id}`}
                                        className="flex-1 text-center bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors font-semibold"
                                    >
                                        Editar
                                    </Link>
                                    <Link
                                        to={`/AdminDelete/${p.id}`}
                                        className="flex-1 text-center bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition-colors font-semibold"
                                    >
                                        Deletar
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}