import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ProdutoDestaque({ produtos, onAddToCart }) {
    const navigate = useNavigate();
    const [slideIndex, setSlideIndex] = useState(0);
    const [produtosPorSlide, setProdutosPorSlide] = useState(5);

    useEffect(() => {
        function updateProdutosPorSlide() {
            const largura = window.innerWidth;
            if (largura < 640) setProdutosPorSlide(1);
            else if (largura < 768) setProdutosPorSlide(2);
            else if (largura < 1024) setProdutosPorSlide(3);
            else setProdutosPorSlide(4);
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

    return (
        <div className="w-full max-w-7xl mx-auto px-4 py-12 relative">
            <h2 className="text-center text-2xl font-bold text-dourado mb-6">
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
                            className="flex flex-nowrap justify-center gap-2 sm:gap-4 md:gap-20 min-w-full px-2"
                        >
                            {grupo.map((produto) => (
                                <div
                                    key={produto.id}
                                    className="rounded-lg shadow-md cursor-pointer flex-shrink-0 relative w-48 sm:w-52 md:w-56 lg:w-60"
                                >
                                    <div
                                        className="overflow-hidden h-48 sm:h-52 md:h-56 lg:h-60"
                                        onClick={() => handleClickProduto(produto.id)}
                                    >
                                        <img
                                            src={`/images/${produto.imagem}`}
                                            alt={produto.nome}
                                            className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                                        />
                                    </div>

                                    <div
                                        className="p-2 text-center"
                                        onClick={() => handleClickProduto(produto.id)}
                                    >
                                        <span className="inline-block bg-dourado text-white text-xs px-2 py-1 rounded-full mb-1">
                                            {produto.categoria}
                                        </span>
                                        <h3 className="font-semibold">{produto.nome}</h3>
                                        <p className="text-dourado font-bold">
                                            R$ {parseFloat(produto.preco).toFixed(2)}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>

            <button
                onClick={() => irParaSlide(slideIndex - 1)}
                className="absolute top-1/2 left-2 transform -translate-y-1/2 text-gray-400 hover:text-dourado"
                aria-label="Anterior"
            >
                &#10094;
            </button>
            <button
                onClick={() => irParaSlide(slideIndex + 1)}
                className="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-400 hover:text-dourado"
                aria-label="Próximo"
            >
                &#10095;
            </button>

            <div className="flex justify-center mt-4 space-x-2">
                {grupos.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => irParaSlide(idx)}
                        className={`w-3 h-3 rounded-full ${idx === slideIndex ? 'bg-dourado' : 'bg-gray-300'
                            }`}
                        aria-label={`Ir para slide ${idx + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}
