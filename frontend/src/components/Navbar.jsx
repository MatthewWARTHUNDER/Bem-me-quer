import { Link, useNavigate } from "react-router-dom";
import { ChevronDown, MapPin, Menu, X, ShoppingCart } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navigate = useNavigate();
    const [carrinhoState, setCarrinhoState] = useState(0);

    useEffect(() => {
        const atualizarCarrinho = () => {
            const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
            setCarrinhoState(carrinho.length);
        };


        atualizarCarrinho();


        window.addEventListener('storage', atualizarCarrinho);


        window.addEventListener('carrinhoAtualizado', atualizarCarrinho);

        return () => {
            window.removeEventListener('storage', atualizarCarrinho);
            window.removeEventListener('carrinhoAtualizado', atualizarCarrinho);
        };
    }, []);

    return (
        <>
            <div className="sticky top-0 w-full bg-verde py-1 text-white text-sm font-medium z-30">
                <Link to={'/Localizacao'} className="flex items-center justify-center gap-1">
                    Nossa Localização <MapPin size={14} />
                </Link>
            </div>

            <nav className="sticky top-7 w-full bg-NavbarEfooter py-5 px-6 shadow-md z-20">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-vibes font text-black ">Bem me quer</h1>

                    <button
                        className="md:hidden text-black"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>

                    <div className="hidden md:flex gap-10 items-center relative">
                        <Link to="/" className="text-black hover:text-verde transition-colors duration-150">Home</Link>

                        <div className="relative group">
                            <button className="text-black hover:text-verde flex items-center gap-1 transition-colors duration-150">
                                Categorias <ChevronDown size={16} />
                            </button>
                            <div className="absolute top-full left-0 z-10 hidden group-hover:block bg-white divide-y divide-gray-100 rounded-lg shadow-lg w-44">
                                <ul className="py-2 text-sm text-gray-700">
                                    <li><Link to="/Loja" className="block px-4 py-2 hover:bg-gray-100">Todos</Link></li>
                                    <li><Link to="/Loja?categoria=arranjomesas" className="block px-4 py-2 hover:bg-gray-100">Arranjos de mesa</Link></li>
                                    <li><Link to="/Loja?categoria=buque" className="block px-4 py-2 hover:bg-gray-100">Buquê de flores</Link></li>
                                    <li><Link to="/Loja?categoria=vasos" className="block px-4 py-2 hover:bg-gray-100">Flores em vasos</Link></li>
                                    <li><Link to="/Loja?categoria=paraeles" className="block px-4 py-2 hover:bg-gray-100">Para eles</Link></li>
                                    <li><Link to="/Loja?categoria=agradecimento" className="block px-4 py-2 hover:bg-gray-100">Agradecimento</Link></li>
                                    <li><Link to="/Loja?categoria=formatura" className="block px-4 py-2 hover:bg-gray-100">Formaturas</Link></li>
                                </ul>
                            </div>
                        </div>

                        <Link to="/Sobre" className="text-black hover:text-verde transition-colors duration-150">Sobre</Link>
                        <Link to="/Localizacao" className="text-black hover:text-verde transition-colors duration-150">Localização</Link>

                        <Link to="/Carrinho" className="relative text-black hover:text-verde">
                            <ShoppingCart size={24} />
                            {carrinhoState > 0 && (
                                <span className="absolute -top-2 -right-2 bg-verde text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                                    {carrinhoState}
                                </span>
                            )}
                        </Link>
                    </div>
                </div>

                {isMobileMenuOpen && (
                    <div className="md:hidden mt-4 flex flex-col gap-4 text-black">
                        <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
                        <Link to="/Loja" onClick={() => setIsMobileMenuOpen(false)}>Categorias</Link>
                        <Link to="/Sobre" onClick={() => setIsMobileMenuOpen(false)}>Sobre</Link>
                        <Link to="/Localizacao" onClick={() => setIsMobileMenuOpen(false)}>Localização</Link>
                        <Link to="/Carrinho" className="relative text-black hover:text-verde">
                            <ShoppingCart size={24} />
                            {carrinhoState > 0 && (
                                <span className="absolute -top-2 start-4 bg-verde text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                                    {carrinhoState}
                                </span>
                            )}
                        </Link>
                    </div>
                )}
            </nav>
        </>
    );
}
