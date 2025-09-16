import { Link } from "react-router-dom";
import BuqueRosaComBranco from "../assets/BuqueRosaComBranco.jpg";
import BuqueMistas from "../assets/BuqueMistas.jpg";
import BuqueVermelha from "../assets/BuqueVermelha.jpg";

export default function BuquesSection() {
    const buques = [
        {
            src: BuqueVermelha,
            title: "Buquê de Rosas Vermelhas",
            price: "R$ 180,00",
            alt: "Buquê de rosas vermelhas",
        },
        {
            src: BuqueRosaComBranco,
            title: "Buquê Vermelha & Branco",
            price: "R$ 150,00",
            alt: "Buquê de rosas vermelhas e brancas",
        },
        {
            src: BuqueMistas,
            title: "Buquê Misto Colorido",
            price: "R$ 200,00",
            alt: "Buquê de flores mistas",
        },
    ];

    return (
        <section className="bg-[#e8ddc8] py-12 px-6 md:px-20">
            <div className="flex flex-col md:flex-row items-center gap-12">


                <div className="md:w-1/3 space-y-6">
                    <h2 className="text-4xl font-bold text-green-900">Buquês de Flores</h2>
                    <p className="text-lg text-gray-800">
                        Buquês artesanais montados com flores frescas, perfeitos para
                        presentear em ocasiões especiais. Cada arranjo é feito com carinho
                        e dedicação para transmitir emoções.
                    </p>
                    <div className="flex flex-col gap-4">
                        <a
                            href="https://wa.me/55XXXXXXXXXX"
                            className="bg-green-900 text-white font-semibold px-8 py-4 rounded-full hover:bg-green-700 transition text-center"
                        >
                            Solicitar Orçamento
                        </a>
                        <Link
                            to="/buques"
                            className="border border-green-900 text-green-900 font-semibold px-8 py-4 rounded-full hover:bg-green-900 hover:text-white transition text-center"
                        >
                            Ver Produtos
                        </Link>
                    </div>
                </div>


                <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {buques.map((item, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-xl shadow-md p-4 flex flex-col items-center"
                        >
                            <img
                                src={item.src}
                                alt={item.alt}
                                className="w-full h-72 object-cover rounded-lg"
                            />
                            <h3 className="mt-4 text-xl font-semibold">{item.title}</h3>
                            <p className="text-lg font-bold">{item.price}</p>
                            <a
                                href="https://wa.me/55XXXXXXXXXX"
                                className="mt-4 border border-green-900 text-green-900 px-6 py-2 rounded-full hover:bg-green-900 hover:text-white transition"
                            >
                                Solicitar Orçamento
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
