import React from "react";
import BuqueMistas from "../assets/BuqueMistas.jpg";
import FloresNobres from "../assets/FloresNobres.jpg";
import BuqueVermelha from "../assets/BuqueVermelha.jpg";
import Hearts from "../assets/Hearts.jpg";
import { Link } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";

export default function SobreNos() {
    return (
        <section className="bg-CorDeFundo py-16 px-6">
            <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
                <div className="grid grid-cols-2 gap-5">
                    <img
                        src={BuqueMistas}
                        alt="Arranjo 1"
                        className="rounded-lg object-cover w-full h-56 shadow-lg transition-transform duration-300 hover:scale-105"
                    />
                    <img
                        src={FloresNobres}
                        alt="Arranjo 2"
                        className="rounded-lg object-cover w-full h-56 shadow-lg transition-transform duration-300 hover:scale-105"
                    />
                    <img
                        src={BuqueVermelha}
                        alt="Arranjo 3"
                        className="rounded-lg object-cover w-full h-56 shadow-lg transition-transform duration-300 hover:scale-105"
                    />
                    <img
                        src={Hearts}
                        alt="Arranjo 4"
                        className="rounded-lg object-cover w-full h-56 shadow-lg transition-transform duration-300 hover:scale-105"
                    />
                </div>


                <div className="text-center md:text-left">
                    <h2 className="text-5xl font-vibes text-VerdeMusgo mb-6">
                        Conheça a Bem me quer
                    </h2>
                    <p className="text-gray-700 mb-8 leading-relaxed">
                        A Bem Me Quer nasceu de um sonho simples: levar beleza e emoção aos momentos mais especiais da vida.
                        Começamos em casa, com muito amor e dedicação, criando arranjos florais e presentes personalizados para transmitir sentimentos únicos.
                        Hoje, com muito carinho, temos nossa loja na cidade, onde transformamos cada florescimento em uma história especial.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                        <a
                            href="https://wa.me/555499179427"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 bg-verde text-white font-semibold px-8 py-3 rounded-full shadow-lg transition-transform duration-200 ease-in-out hover:scale-105"
                        >
                            <FaWhatsapp className="text-lg" />
                            Fale Conosco
                        </a>

                        <Link
                            to="/sobre"
                            className="inline-flex items-center justify-center border border-verde text-verde font-semibold px-8 py-3 rounded-full hover:bg-verde hover:text-white transition"
                        >
                            Saiba Mais
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}