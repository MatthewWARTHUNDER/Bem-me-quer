import { Link } from "react-router-dom";
import { ChevronDown } from 'lucide-react';

export default function Navbar() {
    return (
        <nav className="relative sticky top-0 w-full flex items-center justify-between bg-NavbarEfooter py-5 px-6 z-20">
            <h1 className="text-3xl font-bold text-black font-serif">Bem-me-quer</h1>

            <div className="absolute left-1/2 transform -translate-x-1/2 flex gap-10 items-center">
                <Link to="/Home" className="text-black hover:text-dourado transition-colors duration-150">
                    Home
                </Link>

                <div className="relative group">
                    <button className="text-black hover:text-dourado transition-colors flex items-center gap-1 duration-150">
                        Categorias <ChevronDown size={16} />
                    </button>

                    <div className="absolute top-full left-0  z-10 hidden group-hover:block bg-white divide-y divide-gray-100 rounded-lg shadow-lg w-44 duration-200">
                        <ul className="py-2 text-sm text-gray-700">
                            <li><Link to="/Categoria1" className="block px-4 py-2 hover:bg-gray-100">Até 150,00</Link></li>
                            <li><Link to="/Categoria2" className="block px-4 py-2 hover:bg-gray-100">Até 250,00</Link></li>
                            <li><Link to="/Categoria3" className="block px-4 py-2 hover:bg-gray-100">Arranjos de mesa</Link></li>
                            <li><Link to="/Categoria4" className="block px-4 py-2 hover:bg-gray-100">Buquê de flores</Link></li>
                            <li><Link to="/Categoria5" className="block px-4 py-2 hover:bg-gray-100">Flores em vasos</Link></li>
                            <li><Link to="/Categoria6" className="block px-4 py-2 hover:bg-gray-100">Box de flores</Link></li>
                            <li><Link to="/Categoria7" className="block px-4 py-2 hover:bg-gray-100">Aniversário</Link></li>
                            <li><Link to="/Categoria8" className="block px-4 py-2 hover:bg-gray-100">Maternidade</Link></li>
                            <li><Link to="/Categoria9" className="block px-4 py-2 hover:bg-gray-100">Para Eles</Link></li>
                            <li><Link to="/Categoria10" className="block px-4 py-2 hover:bg-gray-100">Agradecimento</Link></li>
                            <li><Link to="/Categoria11" className="block px-4 py-2 hover:bg-gray-100">Formatura</Link></li>
                            <li><Link to="/Categoria12" className="block px-4 py-2 hover:bg-gray-100">Bomboniere/bebidas</Link></li>
                        </ul>
                    </div>
                </div>

                <Link to="/Sobre" className="text-black hover:text-dourado transition-colors duration-150">
                    Sobre
                </Link>
                <Link to="/Contato" className="text-black hover:text-dourado transition-colors duration-150">
                    Contato
                </Link>
            </div>
        </nav>
    );
}
