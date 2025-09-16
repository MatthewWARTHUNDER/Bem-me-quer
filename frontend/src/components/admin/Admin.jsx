import { useNavigate } from 'react-router-dom';

export default function Admin() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
            <h1 className="text-3xl font-bold mb-2">Bem-vinda, Franciele! 👋</h1>
            <p className="text-lg mb-8">O que você gostaria de fazer?</p>

            <div className="grid gap-6 w-150">
                <button
                    onClick={() => navigate("/AdminGet")}
                    className="bg-dourado text-white py-6 rounded-lg shadow hover:bg-dourado transition font-semibold"
                >
                    Ver produtos
                </button>
            </div>
        </div>
    );
}
