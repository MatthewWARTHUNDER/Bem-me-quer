import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Navbar() {
    return (
        <nav className="relative w-full flex items-center justify-between bg-NavbarEfooter py-5 px-6">
            {/* Logo à esquerda */}
            <img src={logo} alt="Logo da empresa" className="h-28" />

            {/* Links centralizados */}
            <div className="absolute left-1/2 transform -translate-x-1/2 flex gap-10 items-center">
                <Link to="/Home" className="text-black hover:text-dourado transition-colors duration-150">Home</Link>
                <Link to="/Loja" className="text-black hover:text-dourado transition-colors duration-150">Loja</Link>
                <Link to="/Sobre" className="text-black hover:text-dourado transition-colors duration-150">Sobre</Link>
                <Link to="/Contato" className="text-black hover:text-dourado transition-colors duration-150">Contato</Link>
            </div>
        </nav>
    );
}
