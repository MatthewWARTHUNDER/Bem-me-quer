import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ProdutoDestaque({ produtos, onAddToCart }) {
    const navigate = useNavigate();
    const [slideIndex, setSlideIndex] = useState(0);
    const [produtosPorSlide, setProdutosPorSlide] = useState(4);
    const [produtosPorBola, setProdutosPorBola] = useState(4);


    useEffect(() => {
        function updateProdutosPorSlide() {
            const largura = window.innerWidth;
            if (largura < 640) {
                setProdutosPorSlide(1);
                setProdutosPorBola(4);
            } else if (largura < 768) {
                setProdutosPorSlide(2);
                setProdutosPorBola(2);
            } else if (largura < 1024) {
                setProdutosPorSlide(3);
                setProdutosPorBola(3);
            } else {
                setProdutosPorSlide(4);
                setProdutosPorBola(4);
            }
        }

        updateProdutosPorSlide();
        window.addEventListener('resize', updateProdutosPorSlide);
        return () => window.removeEventListener('resize', updateProdutosPorSlide);
    }, []);


    const grupos = [];
    for (let i = 0; i < produtos.length; i += produtosPorSlide) {
        grupos.push(produtos.slice(i, i + produtosPorSlide));
    }

    const irParaSlide = (index) => {
        if (index < 0) index = grupos.length - 1;
        else if (index >= grupos.length) index = 0;
        setSlideIndex(index);
    };

    const handleClickProduto = (id) => {
        navigate(`/produto/${id}`);
    };


    const totalBolinhas = Math.ceil(produtos.length / produtosPorBola);

    return (
        <section className="bg-gray-50 w-full max-w mx-auto px-4 py-14 relative">
            <h2 className="text-center text-3xl font-semibold text-dourado mb-10">
                Destaques | Mais vendidos
            </h2>


            <div className="overflow-hidden">
                <div
                    className="flex transition-transform duration-500 ease-in-out will-change-transform"
                    style={{ transform: `translateX(-${slideIndex * 100}%)` }}
                >
                    {grupos.map((grupo, i) => (
                        <div
                            key={i}
                            className="flex flex-nowrap justify-center gap-4 sm:gap-6 md:gap-8 min-w-full px-2"
                        >
                            {grupo.map((produto) => (
                                <div
                                    key={produto.id}
                                    className="bg-white rounded-xl shadow-md flex-shrink-0 flex flex-col items-center w-60 h-[400px] p-4 cursor-pointer hover:shadow-lg transition"
                                >
                                    <div
                                        className="overflow-hidden w-full h-64 rounded-lg mb-3"
                                        onClick={() => handleClickProduto(produto.id)}
                                    >
                                        <img
                                            src={`/images/${produto.imagem}`}
                                            alt={produto.nome}
                                            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                                        />
                                    </div>
                                    <h3
                                        className="text-lg font-semibold text-center line-clamp-2 mb-2"
                                        onClick={() => handleClickProduto(produto.id)}
                                    >
                                        {produto.nome}
                                    </h3>
                                    <p className="text-dourado font-bold text-lg mb-3">
                                        R$ {parseFloat(produto.preco).toFixed(2)}
                                    </p>
                                    <button
                                        onClick={() => handleClickProduto(produto.id)}
                                        className="border border-green-900 text-green-900 font-semibold w-full py-2 rounded-full hover:bg-green-900 hover:text-white transition"
                                    >
                                        Ver produto
                                    </button>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>


            <button
                onClick={() => irParaSlide(slideIndex - 1)}
                className="absolute top-1/2 left-3 transform -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-black/20 text-white hover:bg-dourado transition"
                aria-label="Anterior"
            >
                &#10094;
            </button>
            <button
                onClick={() => irParaSlide(slideIndex + 1)}
                className="absolute top-1/2 right-3 transform -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-black/20 text-white hover:bg-dourado transition"
                aria-label="Próximo"
            >
                &#10095;
            </button>


            <div className="flex justify-center mt-6 space-x-2">
                {Array.from({ length: totalBolinhas }).map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => irParaSlide(idx)}
                        className={`w-3 h-3 rounded-full transition ${idx === slideIndex ? 'bg-dourado' : 'bg-gray-300'
                            }`}
                        aria-label={`Ir para slide ${idx + 1}`}
                    />
                ))}
            </div>
        </section>
    );
}
