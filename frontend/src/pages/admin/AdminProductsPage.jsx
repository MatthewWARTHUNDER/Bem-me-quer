import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AdminNavbar from "../../components/admin/AdminNavbar";
import BackToAdminPanelButton from "../../components/admin/BackToAdminPanelButton";

// Renomeado para corresponder ao nome do arquivo, que é uma boa prática.
export default function AdminProductsPage() {
    const [produtos, setProdutos] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:3000/produtos")
            .then((res) => setProdutos(res.data))
            .catch((err) => console.error("Erro ao carregar produtos:", err));
    }, []);


    const handleDelete = async (produtoId) => {

        if (window.confirm('Tem certeza que deseja excluir este produto? Esta ação não pode ser desfeita.')) {
            try {
                await axios.delete(`http://localhost:3000/produtos/${produtoId}`);
            
                setProdutos(produtos.filter(p => p.id !== produtoId));
                alert('Produto excluído com sucesso!');
            } catch (error) {
                console.error("Erro ao excluir produto:", error);
                alert('Erro ao excluir o produto.');
            }
        }
    };

    return (
        <div className="bg-CorDeFundo min-h-screen">
            <AdminNavbar />
            <main className="p-6 max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-serif text-VerdeMusgo">Gerenciar Produtos</h1>
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
                                        to={`/admin/produtos/editar/${p.id}`}
                                        className="flex-1 text-center bg-VerdeMusgo text-white py-2 rounded-md hover:bg-opacity-90 transition-colors font-semibold"
                                    >
                                        Editar
                                    </Link>
                                    
                                    <button
                                        onClick={() => handleDelete(p.id)}
                                        className="flex-1 text-center bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition-colors font-semibold"
                                    >
                                        Deletar
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}