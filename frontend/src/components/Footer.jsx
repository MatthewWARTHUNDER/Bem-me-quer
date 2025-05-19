import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-NavbarEfooter">
            <div className="w-full max-w-screen-xl mx-auto p-4 py-6 lg:py-8">
                <div className="flex flex-col md:flex-row md:justify-between gap-6">

                    <div className="flex flex-col items-center md:items-start">
                        <a href="/" className="flex flex-col items-center md:flex-row md:items-center gap-2">
                            <img src={logo} alt="Logo da empresa" className="h-20 md:h-28" />
                            <span className="text-2xl font-semibold text-black">Bem-me-quer</span>
                        </a>
                    </div>


                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center md:text-left">

                        <div>
                            <h2 className="mb-4 text-sm font-semibold uppercase text-black">Legal</h2>
                            <ul>
                                <li>
                                    <Link to="/Privacidade" className="text-black hover:text-dourado transition-colors">
                                        Termos de Privacidade
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Contato */}
                        <div>
                            <h2 className="mb-4 text-sm font-semibold uppercase text-black">Contato</h2>
                            <ul>
                                <li>
                                    <a href="https://wa.me/549999179427" className="text-black hover:text-dourado transition-colors">
                                        WhatsApp
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {/* Mídias sociais */}
                        <div>
                            <h2 className="mb-4 text-sm font-semibold uppercase text-black">Redes sociais</h2>
                            <ul>
                                <li>
                                    <a
                                        href="https://www.instagram.com/bem_me_quer_floresepresentes/?igsh=dmJnbTlucGN2ZW40#"
                                        className="text-black hover:text-dourado transition-colors"
                                    >
                                        Instagram
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <hr className="my-6 border-black" />

                <div className="text-center">
                    <span className="text-black font-medium">
                        © 2025 <a href="/" className="hover:underline">Bem-me-Quer™</a>. Todos os direitos reservados.
                    </span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
