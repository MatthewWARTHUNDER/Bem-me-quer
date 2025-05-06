import { Link, useNavigate } from "react-router-dom";
import { ChevronDown, MapPin, User, Menu, X } from 'lucide-react';
import React, { useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import axios from 'axios';

export default function Navbar() {
    const [searchQuery, setSearchQuery] = useState('');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navigate = useNavigate();

    const handleSearch = async (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            try {
                // Verificando a URL da API
                const response = await axios.get(`http://localhost:3000/produtos/search?q=${searchQuery}`);

                // Verificando a resposta da API
                if (response.status === 200) {
                    const filteredProducts = response.data;
                    console.log(filteredProducts);  // Verifique se os produtos são retornados corretamente

                    // Se não encontrar nenhum produto, podemos alertar
                    if (filteredProducts.length === 0) {
                        alert('Nenhum produto encontrado!');
                    } else {
                        // Navegando para a página de produtos com os dados filtrados
                        navigate('/Produto', { state: { filteredProducts } });
                    }
                } else {
                    alert('Erro ao buscar produtos, tente novamente!');
                }
            } catch (error) {
                console.error('Erro ao fazer a requisição de busca:', error);
                alert('Houve um erro ao tentar buscar os produtos. Por favor, tente novamente.');
            }
        }
    };

    return (
        <>
            <div className="sticky top-0 w-full bg-dourado py-1 text-white text-sm font-medium z-30">
                <Link to={'/Localizacao'} className="flex items-center justify-center gap-1">
                    Nossa Localização <MapPin size={14} />
                </Link>
            </div>

            <nav className="sticky top-7 w-full bg-NavbarEfooter py-5 px-6 shadow-md z-20">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-black font-serif">Bem-me-quer</h1>

                    {/* Botão hambúrguer (mobile) */}
                    <button
                        className="md:hidden text-black"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>

                    {/* Menu Desktop */}
                    <div className="hidden md:flex gap-10 items-center relative">
                        <Link to="/" className="text-black hover:text-dourado transition-colors duration-150">Home</Link>

                        <div className="relative group">
                            <button className="text-black hover:text-dourado flex items-center gap-1 transition-colors duration-150">
                                Categorias <ChevronDown size={16} />
                            </button>
                            <div className="absolute top-full left-0 z-10 hidden group-hover:block bg-white divide-y divide-gray-100 rounded-lg shadow-lg w-44">
                                <ul className="py-2 text-sm text-gray-700">
                                    <li><Link to="/Loja" className="block px-4 py-2 hover:bg-gray-100">Todos</Link></li>
                                    <li><Link to="/Loja?categoria=arranjomesas" className="block px-4 py-2 hover:bg-gray-100">Arranjos de mesa</Link></li>
                                    <li><Link to="/Loja?categoria=buque" className="block px-4 py-2 hover:bg-gray-100">Buquê de flores</Link></li>
                                </ul>
                            </div>
                        </div>

                        <Link to="/Sobre" className="text-black hover:text-dourado transition-colors duration-150">Sobre</Link>
                        <Link to="/contato" className="text-black hover:text-dourado transition-colors duration-150">Contato</Link>

                        <input
                            type="text"
                            placeholder="Pesquisar"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyPress={handleSearch}
                            className="bg-gato text-black rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-dourado"
                        />

                        <Link to="/Carrinho" className="text-black hover:text-dourado"><ShoppingCart size={24} /></Link>
                    </div>
                </div>

                {/* Menu Mobile */}
                {isMobileMenuOpen && (
                    <div className="md:hidden mt-4 flex flex-col gap-4 text-black">
                        <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
                        <Link to="/Loja" onClick={() => setIsMobileMenuOpen(false)}>Categorias</Link>
                        <Link to="/Sobre" onClick={() => setIsMobileMenuOpen(false)}>Sobre</Link>
                        <Link to="/contato" onClick={() => setIsMobileMenuOpen(false)}>Contato</Link>
                        <input
                            type="text"
                            placeholder="Pesquisar"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyPress={handleSearch}
                            className="bg-gato text-black rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-dourado"
                        />
                        <Link to="/Carrinho" className="flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
                            <ShoppingCart size={20} /> Meu carrinho
                        </Link>
                    </div>
                )}
            </nav>
        </>
    );
}
