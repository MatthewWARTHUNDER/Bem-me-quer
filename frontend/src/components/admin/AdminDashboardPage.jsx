import { useNavigate } from 'react-router-dom';

export default function Admin() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-CorDeFundo px-4">
            <div className="text-center">
                <h1 className="text-4xl font-serif text-VerdeMusgo mb-2">Bem-vinda, Franciele! 👋</h1>
                <p className="text-lg text-gray-600 mb-8">O que você gostaria de fazer?</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl">
                <button
                    onClick={() => navigate("/admin/produtos")} 
                    className="bg-white text-VerdeMusgo border border-VerdeMusgo py-8 rounded-lg shadow-lg hover:bg-VerdeMusgo hover:text-white transition-colors duration-300 font-semibold text-xl"
                >
                    Ver e Gerenciar Produtos
                </button>
                <button
                    onClick={() => navigate("/admin/produtos/criar")} 
                    className="bg-white text-VerdeMusgo border border-VerdeMusgo py-8 rounded-lg shadow-lg hover:bg-VerdeMusgo hover:text-white transition-colors duration-300 font-semibold text-xl"
                >
                    Criar Novo Produto
                </button>
            </div>
        </div>
    );
}