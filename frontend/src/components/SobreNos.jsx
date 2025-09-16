import React from "react";
import BuqueMistas from "../assets/BuqueMistas.jpg";
import FloresNobres from "../assets/FloresNobres.jpg";
import BuqueVermelha from "../assets/BuqueVermelha.jpg";
import Hearts from "../assets/Hearts.jpg";
import { Link } from "react-router-dom";
import { FaWhatsapp, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaInstagram, FaAddressBook, FaAddressCard, FaClock, } from "react-icons/fa";


export default function SobreNos() {
    return (
        <>
            <section className="bg-gray-100 py-16 px-6">
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">
                    <div className="grid grid-cols-2 gap-4">
                        <img
                            src={BuqueMistas}
                            alt="Arranjo 1"
                            className="rounded-lg object-cover w-full h-56"
                        />
                        <img
                            src={FloresNobres}
                            alt="Arranjo 2"
                            className="rounded-lg object-cover w-full h-56"
                        />
                        <img
                            src={BuqueVermelha}
                            alt="Arranjo 3"
                            className="rounded-lg object-cover w-full h-56"
                        />
                        <img
                            src={Hearts}
                            alt="Arranjo 4"
                            className="rounded-lg object-cover w-full h-56"
                        />
                    </div>


                    <div>
                        <h2 className="text-3xl font-serif text-green-900 mb-4">
                            Conheça a Floricultura Vaticano
                        </h2>
                        <p className="text-gray-700 mb-4">
                            A Bem Me Quer nasceu de um sonho simples: levar beleza e emoção aos momentos mais especiais da vida.
                            Começamos em casa, com muito amor e dedicação, criando arranjos florais e presentes personalizados para transmitir sentimentos únicos.
                            Hoje, com muito carinho, temos nossa loja na cidade, onde transformamos cada florescimento em uma história especial.
                        </p>

                        <div className="flex gap-4">
                            <a
                                href="https://wa.me/5541995035780"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-green-900 text-white px-6 py-2 rounded-md flex items-center gap-2 hover:bg-green-800 transition"
                            >
                                <FaWhatsapp className="text-lg" />
                                Fale Conosco
                            </a>

                            <Link
                                to="/Sobre"
                                className="border border-green-900 text-green-900 px-6 py-2 rounded-md flex items-center gap-2 hover:bg-green-50 transition"
                            >
                                Sobre Nós
                            </Link>
                        </div>

                    </div>
                </div>
            </section>

        </>
    )
}