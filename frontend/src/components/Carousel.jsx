import FloresNobres from "../assets/FloresNobres.jpg";
import Hearts from "../assets/Hearts.jpg";
import Maternidade from "../assets/Maternidade.jpg";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';

const images = [
    {
        src: FloresNobres,
        title: 'Flores para todas as ocasiões',
        description: 'Escolha o presente perfeito',
        button: 'Ver produtos'
    },
    {
        src: Hearts,
        title: 'Descubra benefícios',
        description: 'Presentes com chocolates e muito amor',
        button: 'Ver produtos'
    },
    {
        src: Maternidade,
        title: 'Entrega rápida e com carinho',
        description: 'Enviamos para todo passo fundo!',
        button: 'Ver produtos'
    }
];

const Carousel = () => {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent(prev => (prev + 1) % images.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative rounded-lg mt-10 w-full max-w-5xl mx-auto bottom-5 h-[300px] md:h-[350px] overflow-hidden">
            {images.map((item, index) => (
                <div
                    key={index}
                    className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${index === current ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                >
                    <img
                        src={item.src}
                        alt={item.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
                    <div className="absolute inset-0 flex flex-col justify-center items-start px-6 md:px-20 text-white z-20">
                        <h2 className="text-2xl md:text-4xl font-bold mb-2">{item.title}</h2>
                        <p className="text-md md:text-lg mb-4">{item.description}</p>
                        <Link to="/Loja">
                            <button className="bg-white text-black font-semibold px-5 py-2 rounded hover:bg-dourado transition">
                                {item.button}
                            </button>
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Carousel;
