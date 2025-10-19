import React from 'react';
import { FaWhatsapp, FaRegHeart, FaShippingFast, FaRegClock, FaDollarSign, FaGift } from 'react-icons/fa';
import { LuFlower } from "react-icons/lu";

const diferenciais = [
    {
        icon: <LuFlower size={36} />,
        title: "Flores Frescas e Selecionadas",
        description: "Garantimos a melhor qualidade, com flores selecionadas diariamente."
    },
    {
        icon: <FaGift size={36} />,
        title: "Montagem Artesanal",
        description: "Cada arranjo é montado à mão com carinho e atenção aos detalhes."
    },
    {
        icon: <FaShippingFast size={36} />,
        title: "Entrega com Pontualidade",
        description: "Seu presente chega na hora certa e com todo o cuidado necessário."
    },
    {
        icon: <FaRegHeart size={36} />,
        title: "Atendimento Acolhedor",
        description: "Estamos aqui para ajudar você a escolher o presente perfeito."
    },
    {
        icon: <FaRegClock size={36} />,
        title: "Horário Flexível",
        description: "Atendemos em horário estendido para sua conveniência."
    }
];

export default function Diferenciais() {
    return (
        <section className="bg-verde text-white py-16 px-6">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-5xl font-vibes mb-16">
                    Por que escolher a Bem me quer
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-10 mb-16 text-left">
                    {diferenciais.map((item, index) => (
                        <div key={index} className="flex items-start gap-4">
                            <div className="text-white mt-1">
                                {item.icon}
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                                <p className="text-gray-300 text-sm">{item.description}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <a
                    href="https://wa.me/555499179427"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 border-2 border-white text-white font-semibold px-8 py-3 rounded-full hover:bg-white hover:text-verde transition-colors duration-300"
                >
                    <FaWhatsapp className="text-lg" />
                    Fale Agora Conosco
                </a>
            </div>
        </section>
    );
}