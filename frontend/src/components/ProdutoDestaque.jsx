import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { FaWhatsapp } from 'react-icons/fa';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function ProdutoDestaque({ produtos }) {
    return (
        <section className="bg-VerdeMusgo w-full py-10 overflow-hidden">

            <style>
                {`
                    .swiper-pagination {
                        position: relative;
                        margin-top: 2rem;
                    }
                    .swiper-pagination-bullet {
                        background-color: #fff;
                        opacity: 0.5;
                    }
                    .swiper-pagination-bullet-active {
                        background-color: #fff;
                        opacity: 1;
                    }
                `}
            </style>

            <div className="text-center mb-12 px-4">
                <h2 className="text-5xl font-vibes text-white">
                    Flores em Destaque
                </h2>
                <p className="mt-4 text-gray-200 max-w-xl mx-auto">
                    Nossa floricultura possui uma seleção especial dos produtos mais pedidos e flores em promoção.
                </p>
            </div>

            <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={15}
                slidesPerView={1.25}
                centeredSlides={true}
                loop={true}
                pagination={{ clickable: true }}
                navigation
                breakpoints={{
                    640: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                        centeredSlides: false,
                    },
                    768: {
                        slidesPerView: 3,
                        spaceBetween: 30,
                    },
                    1024: {
                        slidesPerView: 4,
                        spaceBetween: 30,
                    },
                }}
                className="max-w-6xl"
                style={{
                    "--swiper-navigation-color": "#ffffff",
                    "--swiper-pagination-color": "#ffffff",
                }}
            >
                {produtos.slice(0, 8).map((produto) => (
                    <SwiperSlide key={produto.id}>
                        <Link
                            to={`/produto/${produto.id}`}
                            className="group bg-white rounded-lg shadow-lg overflow-hidden flex flex-col h-full"
                        >
                            <div className="overflow-hidden">
                                <img
                                    src={`/images/${produto.imagem}`}
                                    alt={produto.nome}
                                    className="w-full h-64 object-cover"
                                />
                            </div>
                            <div className="p-5 flex flex-col flex-grow text-center">
                                <h3 className="text-lg font-semibold text-gray-800 mb-1 truncate">
                                    {produto.nome}
                                </h3>
                                <p className="text-xl text-VerdeMusgo font-bold mt-2">
                                    R$ {parseFloat(produto.preco).toFixed(2)}
                                </p>
                            </div>
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10 px-4">
                <a
                    href="https://wa.me/555499179427"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-white text-VerdeMusgo font-semibold px-8 py-3 rounded-full shadow-lg transition-transform duration-200 ease-in-out hover:scale-105"
                >
                    <FaWhatsapp className="text-lg" />
                    Solicitar Orçamento
                </a>

                <Link
                    to="/loja"
                    className="inline-flex items-center justify-center border border-white text-white font-semibold px-8 py-3 rounded-full hover:bg-white hover:text-VerdeMusgo transition"
                >
                    Ir para a Loja
                </Link>
            </div>
        </section>
    );
}