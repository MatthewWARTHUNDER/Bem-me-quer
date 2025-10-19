import { Link } from "react-router-dom";
import BuqueRosaComBranco from "../assets/BuqueRosaComBranco.jpg";
import BuqueMistas from "../assets/BuqueMistas.jpg";
import BuqueVermelha from "../assets/BuqueVermelha.jpg";

export default function CarouselBuques() {
    const buques = [
        {
            src: BuqueVermelha,
            title: "Buquê de Rosas Vermelhas",
            price: "R$ 180,00",
            alt: "Buquê de rosas vermelhas",
            link: "/loja?categoria=buque" 
        },
        {
            src: BuqueRosaComBranco,
            title: "Buquê Vermelha & Branco",
            price: "R$ 150,00",
            alt: "Buquê de rosas vermelhas e brancas",
            link: "/loja?categoria=buque"
        },
        {
            src: BuqueMistas,
            title: "Buquê Misto Colorido",
            price: "R$ 200,00",
            alt: "Buquê de flores mistas",
            link: "/loja?categoria=buque"
        },
    ];

    return (
        <section className="bg-VerdeMusgo text-white py-16 px-6 md:px-20">
            <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center gap-12">


                <div className="md:w-1/3 space-y-6 text-center md:text-left">
                    <h2 className="text-5xl font-vibes text-white">Nossos Buquês</h2>
                    <p className="text-base text-gray-200 leading-relaxed">
                        Buquês artesanais montados com flores frescas, perfeitos para
                        presentear em ocasiões especiais. Cada arranjo é feito com carinho
                        e dedicação para transmitir emoções.
                    </p>
                    <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row gap-4 justify-center md:justify-start">
                        <a
                            href="https://wa.me/555499179427"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-white text-VerdeMusgo font-semibold px-8 py-3 rounded-full shadow-lg transition-transform duration-200 ease-in-out hover:scale-105 text-center"
                        >
                            Solicitar Orçamento
                        </a>
                        <Link
                            to="/loja?categoria=buque"
                            className="border border-white text-white font-semibold px-8 py-3 rounded-full hover:bg-white hover:text-VerdeMusgo transition text-center"
                        >
                            Ver Todos
                        </Link>
                    </div>
                </div>

                <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {buques.map((item, index) => (
                        <Link
                            to={item.link}
                            key={index}
                            className="group bg-white rounded-lg shadow-lg overflow-hidden flex flex-col transition-transform"
                        >
                            <div className="overflow-hidden">
                                <img
                                    src={item.src}
                                    alt={item.alt}
                                    className="w-full h-72 object-cover"
                                />
                            </div>
                            <div className="p-5 flex flex-col flex-grow text-center">
                                <h3 className="text-lg font-semibold text-gray-800 mb-1">
                                    {item.title}
                                </h3>
                                <p className="text-xl text-VerdeMusgo font-bold mt-auto">
                                    {item.price}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}