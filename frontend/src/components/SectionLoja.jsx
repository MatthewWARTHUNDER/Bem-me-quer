import { Link } from 'react-router-dom';
import Hearts from '../assets/Hearts.jpg';
import FloresNobres from '../assets/FloresNobres.jpg';
import BuqueRosacomBranco from '../assets/BuqueRosacomBranco.jpg';

export default function SectionLoja() {
    const categoriasDestaque = [
        {
            nome: "Box de Flores",
            imagem: Hearts,
            alt: "Box de flores com corações",
            link: "/loja?categoria=box"
        },
        {
            nome: "Buquê de Flores",
            imagem: BuqueRosacomBranco,
            alt: "Buquê de flores rosas e brancas",
            link: "/loja?categoria=buque"
        },
        {
            nome: "Flores em Vasos",
            imagem: FloresNobres,
            alt: "Flores nobres em um vaso",
            link: "/loja?categoria=vasos"
        }
    ];

    return (
        <section className="py-16 px-6">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">


                <div className="lg:order-2 flex flex-col justify-center items-center lg:items-start text-center lg:text-left">
                    <h2 className="text-5xl font-vibes text-verde">
                        Nossas Categorias
                    </h2>
                    <p className="text-gray-700 mt-4 leading-relaxed max-w-md">
                        Explore nossa loja virtual e encontre o presente perfeito para cada ocasião.
                    </p>
                    <Link to="/Loja" className="w-full sm:w-auto mt-6">
                        <button className="border border-verde text-verde font-semibold w-full sm:w-auto px-10 py-3 rounded-full hover:bg-VerdeMusgo hover:text-white transition">
                            Ir para a loja
                        </button>
                    </Link>
                </div>

                <div className="lg:order-1 grid grid-cols-1 sm:grid-cols-3 gap-8">
                    {categoriasDestaque.map((cat, index) => (
                        <Link
                            to={cat.link}
                            key={index}
                            className="group text-center bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl"
                        >
                            <img
                                src={cat.imagem}
                                alt={cat.alt}
                                className="w-full h-50 object-cover"
                            />
                            <h3 className="py-4 text-lg font-semibold text-gray-800">{cat.nome}</h3>
                        </Link>
                    ))}
                </div>

            </div>
        </section>
    );
}