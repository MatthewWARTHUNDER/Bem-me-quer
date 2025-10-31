import { useNavigate } from 'react-router-dom';

export default function BackToAdminPanelButton() {
    const navigate = useNavigate();

    return (
        <button
            onClick={() => navigate('/admin')}
            className="flex items-center gap-2 bg-gray-600 text-white font-semibold px-6 py-2 rounded-lg shadow-md m-4 transition-transform hover:scale-105"
            aria-label="Voltar ao painel de administração"
        >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
            Voltar ao Painel
        </button>
    );
}