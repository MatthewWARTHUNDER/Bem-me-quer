import { Link } from "react-router-dom";
import { ChevronDown } from 'lucide-react';
import Localizacao from "../pages/Localizacao";
import { MapPin } from 'lucide-react';
import FloresNobres from "../assets/FloresNobres.jpg";
import FloresVermelhas from "../assets/FloresVermelhas.jpg";
import Hearts from "../assets/Hearts.jpg";
import Maternidade from "../assets/Maternidade.jpg";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {

    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const products = [
        { id: 1, nome: "Buquê Vermelho", image: FloresVermelhas },
        { id: 2, nome: "Flores de mesa", image: FloresNobres },
        { id: 3, nome: "Box Rosas & Chocolate", image: Hearts },
        { id: 4, nome: "Mimo Maternidade", image: Maternidade },
        { id: 5, nome: "Vaso de Flores Silvestres", image: FloresVermelhas },
        { id: 6, nome: "Flores para Ele", image: FloresNobres },
        { id: 7, nome: "Arranjo de Agradecimento", image: Hearts },
        { id: 8, nome: "Flores de Formatura", image: FloresVermelhas },
        { id: 9, nome: "Bomboniere & Bebidas", image: Hearts },
    ];

    const handleSearch = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const filteredProducts = products.filter(product => product.nome.toLowerCase().includes(searchQuery.toLowerCase()))

            navigate('/Produto', {
                state: { filteredProducts: filteredProducts }
            });
        }
    };





    return (
        <>
            <div className="w-full bg-dourado py-1 text-white text-sm font-medium">
                <Link to={'/Localizacao'} className="flex items-center justify-center gap-1">
                    Nossa Localização <MapPin size={14} />
                </Link>
            </div>

            <nav className="relative sticky  rounded-b-lg top-0 w-full flex items-center justify-between bg-NavbarEfooter py-5 px-6 z-20 shadow-md">
                <h1 className="text-3xl font-bold text-black font-serif">Bem-me-quer</h1>

                <div className="absolute left-1/2 transform -translate-x-1/2 flex gap-10 items-center">
                    <Link to="/" className="text-black hover:text-dourado transition-colors duration-150">
                        Home
                    </Link>

                    <div className="relative group">
                        <button className="text-black hover:text-dourado transition-colors flex items-center gap-1 duration-150">
                            Categorias <ChevronDown size={16} />
                        </button>

                        <div className="absolute top-full left-0 z-10 hidden group-hover:block bg-white divide-y divide-gray-100 rounded-lg shadow-lg w-44 duration-200">
                                <ul className="py-2 text-sm text-gray-700">
                                    <li><Link to="/Loja" className="block px-4 py-2 hover:bg-gray-100">Todos</Link></li>
                                    <li><Link to="/Loja?categoria=arranjomesas" className="block px-4 py-2 hover:bg-gray-100">Arranjos de mesa</Link></li>
                                    <li><Link to="/Loja?categoria=buque" className="block px-4 py-2 hover:bg-gray-100">Buquê de flores</Link></li>
                                    <li><Link to="/Loja?categoria=vasos" className="block px-4 py-2 hover:bg-gray-100">Flores em vasos</Link></li>
                                    <li><Link to="/Loja?categoria=box" className="block px-4 py-2 hover:bg-gray-100">Box de flores</Link></li>
                                    <li><Link to="/Loja?categoria=maternidade" className="block px-4 py-2 hover:bg-gray-100">Maternidade</Link></li>
                                    <li><Link to="/Loja?categoria=paraeles" className="block px-4 py-2 hover:bg-gray-100">Para Eles</Link></li>
                                    <li><Link to="/Loja?categoria=agradecimento" className="block px-4 py-2 hover:bg-gray-100">Agradecimento</Link></li>
                                    <li><Link to="/Loja?categoria=formatura" className="block px-4 py-2 hover:bg-gray-100">Formatura</Link></li>
                                    <li><Link to="/Loja?categoria=bomboniereEbebibas" className="block px-4 py-2 hover:bg-gray-100">Bomboniere/bebidas</Link></li>
                                </ul>

                        </div>
                    </div>

                    <Link to="/sobre" className="text-black hover:text-dourado transition-colors duration-150">
                        Sobre
                    </Link>
                    <Link to="/contato" className="text-black hover:text-dourado transition-colors duration-150">
                        Contato
                    </Link>

                    <div className="relative">
                        <input type="text"
                            placeholder="Pesquisar"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={handleSearch}
                            className="bg-gato text-black rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-dourado"
                        />
                    </div>
                </div>
            </nav>
        </>
    );
}
