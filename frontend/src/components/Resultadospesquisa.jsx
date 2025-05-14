import { useSearchParams, useNavigate } from "react-router-dom"; // Adicionar useNavigate
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "./Loader";

export default function Resultadopesquisa() {
    const [searchParams] = useSearchParams();
    const busca = searchParams.get("busca");
    const [produtos, setProdutos] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [mensagem, setMensagem] = useState('');
    const [erro, setErro] = useState(false);

    const navigate = useNavigate(); // Hook para navegação

    const buscarProdutos = async () => {
        if (!busca) return;

        setCarregando(true);
        setMensagem('');
        setErro(false);

        try {
            const response = await axios.get(`http://localhost:3000/produtos/search?q=${encodeURIComponent(busca)}`);
            if (response.data.length === 0) {
                setMensagem('Nenhum produto encontrado.');
            } else {
                setProdutos(response.data);
            }
        } catch (err) {
            console.error("Erro ao buscar produtos:", err);
            setMensagem('Erro ao buscar produtos. Coloque outra palavra chave!');
            setErro(true);
            setProdutos([]);
        } finally {
            setCarregando(false);
        }
    };

    useEffect(() => {
        if (busca) {
            buscarProdutos();
        }
    }, [busca]); 

    const handleClickProduto = (id) => {

        navigate(`/produto/${id}`);
    };

    if (carregando) return <Loader />;

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Resultado para: "{busca}"</h2>
            {mensagem && <p className="text-center text-gray-600">{mensagem}</p>}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {produtos.length > 0 ? (
                    produtos.map((produto) => (
                        <div
                            key={produto.id}
                            className="bg-white p-4 rounded-xl shadow hover:shadow-md transition cursor-pointer"
                            onClick={() => handleClickProduto(produto.id)} 
                            
                        >
                            <img
                                src={`http://localhost:3000/imagens/${produto.imagem}`} 
                                alt={produto.nome}
                                className="w-full h-48 object-cover mb-2"
                            />
                            <h3 className="text-lg font-semibold">{produto.nome}</h3>
                            <p className="text-gray-600">{produto.descricao}</p>
                            <p className="text-dourado font-bold mt-2">R$ {Number(produto.preco).toFixed(2)}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-600"></p>
                )}
            </div>
        </div>
    );
}
