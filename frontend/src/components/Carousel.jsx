import FloresNobres from "../assets/FloresNobres.jpg";
import Hearts from "../assets/Hearts.jpg";
import Maternidade from "../assets/Maternidade.jpg";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";

const images = [
    {
        src: FloresNobres,
        title: "Flores para todas as ocasiões",
        description: "Escolha o presente perfeito",
        button: "Ver produtos",
        alt: "Arranjo de flores nobres em um fundo neutro"
    },
    {
        src: Hearts,
        title: "Descubra benefícios",
        description: "Presentes com chocolates e muito amor",
        button: "Ver produtos",
        alt: "Presente com corações e chocolates"
    },
    {
        src: Maternidade,
        title: "Entrega rápida e com carinho",
        description: "Enviamos para todo Passo Fundo!",
        button: "Ver produtos",
        alt: "Flores para maternidade em cesta"
    }
];



const Carousel = () => {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % images.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const goToSlide = (index) => setCurrent(index);

    return (
        <section className="w-full h-[450px] relative overflow-hidden mx-auto rounded-none shadow-lg">

            {images.map((item, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 transition-all duration-1000 ease-in-out transform ${index === current ? "opacity-100 scale-100 z-10" : "opacity-0 scale-95 z-0"
                        }`}
                >
                    <img
                        src={item.src}
                        alt={item.alt}
                        className="w-full h-full object-cover pointer-events-none"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent z-10" />
                    <div className="absolute inset-0 flex flex-col justify-center items-start px-6 md:px-20 text-white z-20">
                        <h2 className="text-4xl md:text-6xl font-bold mb-3 drop-shadow">
                            {item.title}
                        </h2>
                        <p className="text-xl md:text-2xl mb-6 drop-shadow">{item.description}</p>
                        <Link to="/loja">
                            <button className="bg-dourado text-white font-semibold px-8 py-4 rounded hover:bg-yellow-500 transition cursor-pointer text-lg md:text-xl">
                                {item.button}
                            </button>
                        </Link>
                    </div>
                </div>
            ))}

            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3 z-10">
                {images.map((_, index) => (
                    <button
                        key={index}
                        className={`w-4 h-4 rounded-full border-2 border-white ${index === current ? "bg-white" : "bg-white/50"
                            }`}
                        onClick={() => goToSlide(index)}
                        aria-label={`Ir para slide ${index + 1}`}
                    />
                ))}
            </div>
        </section>
    );
};


export default Carousel;
