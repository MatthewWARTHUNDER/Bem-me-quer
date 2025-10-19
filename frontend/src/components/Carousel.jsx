import { Link } from "react-router-dom";
import FloresNobres from "../assets/FloresNobres.jpg";
import Hearts from "../assets/Hearts.jpg";
import Maternidade from "../assets/Maternidade.jpg";


import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';

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
        title: "Presentes com Afeto",
        description: "Descubra nossas opções com chocolates e muito amor.",
        button: "Ver produtos",
        alt: "Presente com corações e chocolates"
    },
    {
        src: Maternidade,
        title: "Entrega rápida e com carinho",
        description: "Enviamos para toda Passo Fundo!",
        button: "Ver produtos",
        alt: "Flores para maternidade em cesta"
    }
];

const Carousel = () => {
    return (
        <section className="w-full h-[550px] relative">
            
            <Swiper
                modules={[Autoplay, Pagination, EffectFade]}
                effect="fade"
                loop={true}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                pagination={{ clickable: true }}
                className="h-full"
                style={{
                    '--swiper-pagination-color': '#FFFFFF',
                    '--swiper-pagination-bullet-inactive-color': '#FFFFFF',
                    '--swiper-pagination-bullet-inactive-opacity': '0.5',
                }}
            >
                {images.map((item, index) => (
                    <SwiperSlide key={index}>
                        <img
                            src={item.src}
                            alt={item.alt}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
                        <div className="absolute inset-0 flex flex-col justify-center items-start px-6 md:px-20 text-white z-10">
                            <h2 className="text-4xl md:text-6xl font-serif font-bold mb-4 drop-shadow-lg">
                                {item.title}
                            </h2>
                            <p className="text-xl md:text-2xl mb-8 drop-shadow-md max-w-lg">{item.description}</p>
                            <Link
                                to="/loja"
                                className="bg-VerdeMusgo text-white font-semibold px-8 py-3 rounded-full shadow-lg transition-transform duration-200 ease-in-out hover:scale-105 text-lg"
                            >
                                {item.button}
                            </Link>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
};

export default Carousel;