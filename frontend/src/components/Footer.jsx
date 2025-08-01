import { Link } from "react-router-dom";
import React from "react";
import logo from "../assets/logo.png";
import {
    FaWhatsapp,
    FaPhoneAlt,
    FaEnvelope,
    FaMapMarkerAlt,
    FaInstagram,
    FaAddressBook,
    FaAddressCard,
    FaClock,
} from "react-icons/fa";


const Footer = () => {
    return (
        <footer className="bg-NavbarEfooter text-bçack py-10">
            <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row md:justify-between gap-10 px-6">


                <div className="flex flex-col items-center md:items-start">
                    <Link to="/" className="flex flex-col items-center md:items-start gap-2">
                        <img src={logo} alt="Logo da empresa" className="h-32 md:h-40" />
                        {/* <span className="text-2xl font-vibes">Bem me Quer</span> */}
                    </Link>
                </div>


                <div className="flex flex-col gap-3">
                    <h2 className="text-lg font-semibold">Atendimento</h2>
                    <div className="flex items-center gap-2">
                        <FaWhatsapp /> <span>(41) 99503-5780</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <FaPhoneAlt /> <span>(41) 99503-5780</span>
                    </div>
                    <div className="flex items-start gap-2">
                        <FaMapMarkerAlt />
                        <span>
                            R. Maurício Cardoso, 110<br />
                            Passo Fundo - RS
                        </span>
                    </div>

                    <div className="flex items-start gap-2">
                        <FaClock/>
                        <span>
                            Segunda a Sexta: 08:00 - 18:00<br />
                            Sábado: 08:00 - 13:00 (sem fechar ao meio-dia)
                        </span>

                    </div>
                </div>


                <div className="flex flex-col gap-2">
                    <h2 className="text-lg font-semibold">Navegação</h2>
                    <Link to="/">Home</Link>
                    <Link to="/sobre">Sobre Nós</Link>
                    <Link to="/privacidade">Política de Privacidade</Link>
                    <Link to="/localizacao" >Localização</Link>
                </div>


                <div className="flex flex-col gap-2">
                    <h2 className="text-lg font-semibold">Produtos</h2>
                    <Link to="/produtos?categoria=arranjos">Arranjos</Link>
                    <Link to="/produtos?categoria=buque">Buquês</Link>
                    <Link to="/produtos?categoria=coroas">Coroas</Link>
                    <Link to="/produtos?categoria=presentes">Presentes Especiais</Link>
                    <Link to="/produtos?categoria=vasos">Vasos de Flores</Link>
                </div>


                <div className="flex flex-col gap-3">
                    <h2 className="text-lg font-semibold">Redes Sociais</h2>
                    <a
                        href="https://www.instagram.com/bem_me_quer_floresepresentes/"
                        className="text-2xl hover:text-dourado transition-colors"
                    >
                        <FaInstagram />
                    </a>
                </div>
            </div>

            <div className="text-center mt-8 text-sm">
                © 2025 <span className="font-semibold">Bem me Quer™</span>. Todos os direitos reservados.
            </div>
        </footer>
    );
};

export default Footer;
