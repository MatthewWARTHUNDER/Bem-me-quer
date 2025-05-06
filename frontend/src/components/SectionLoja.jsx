import Navbar from './Navbar';
import Footer from './Footer';
import { Link } from 'react-router-dom';
import Hearts from '../assets/Hearts.jpg';
import FloresNobres from '../assets/FloresNobres.jpg';
import Garibaldi from '../assets/Garibaldi.jpg';

export default function SectionLoja() {
    return (
        <>
            <section className="bg-white py-20 px-6">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
                    
                    <div className="text-center">
                        <img src={Hearts} alt="Box de flores" className="w-full h-80 object-cover rounded-md" />
                        <h2 className="mt-4 text-lg font-medium">Box de flores</h2>
                    </div>

                    <div className="text-center">
                        <img src={Garibaldi} alt="Buquê de flores" className="w-full h-80 object-cover rounded-md" />
                        <h2 className="mt-4 text-lg font-medium">Buquê de flores</h2>
                    </div>

                    <div className="text-center">
                        <img src={FloresNobres} alt="Flores em vasos" className="w-full h-80 object-cover rounded-md" />
                        <h2 className="mt-4 text-lg font-medium">Flores em vasos</h2>
                    </div>

                    <div className="flex flex-col justify-center items-center md:items-start mt-6 md:mt-0">
                        <h2 className="text-2xl font-light text-black">Todas as categorias</h2>
                        <p className="text-gray-600 mt-4 text-center md:text-left">
                            Que tal dar uma olhada em nossa loja virtual?
                        </p>
                        <Link to="/Loja" className="cursor-pointer">
                            <button className="bg-dourado text-white px-4 py-2 rounded mt-4 cursor-pointer hover-40">
                                Ir para a loja
                            </button>
                        </Link>
                    </div>

                </div>
            </section>
        </>
    );
}
