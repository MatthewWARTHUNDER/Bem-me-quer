import React, { useState } from 'react';
import AdminProdutosPage from './AdminProdutosPage';
import AdminPedidosPage from './AdminPedidosPage';

export default function AdminDashboard() {
    const [abaAtiva, setAbaAtiva] = useState('produtos');

    return (
        <div className="max-w-6xl mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">Painel Administrativo</h1>

            <div className="flex space-x-4 mb-6">
                <button
                    onClick={() => setAbaAtiva('produtos')}
                    className={`px-4 py-2 rounded ${
                        abaAtiva === 'produtos'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-200 text-gray-800'
                    }`}
                >
                    Produtos
                </button>
                <button
                    onClick={() => setAbaAtiva('pedidos')}
                    className={`px-4 py-2 rounded ${
                        abaAtiva === 'pedidos'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-200 text-gray-800'
                    }`}
                >
                    Pedidos
                </button>
            </div>

            <div className="bg-white p-4 rounded shadow">
                {abaAtiva === 'produtos' && <AdminProdutosPage />}
                {abaAtiva === 'pedidos' && <AdminPedidosPage />}
            </div>
        </div>
    );
}
