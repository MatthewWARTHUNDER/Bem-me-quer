import React from 'react';
import { FaInstagram } from 'react-icons/fa'; // Importando o ícone do Instagram

const InstagramSection = () => {
    return (
        <section className="bg-gray-100 py-16">
            <div className="max-w-screen-xl mx-auto px-4 text-center">
                <h1 className="text-3xl font-bold mb-4">Nos segue</h1>
                <p className="text-lg mb-8">@bem_me_quer_floresepresentes</p>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                    {/* Adicione suas imagens do Instagram aqui */}
                    <div className="relative group">
                        <img
                            src="https://www.instagram.com/p/DIXOpHYxjmH/" 
                            alt="Instagram 1"
                            className="w-full h-full object-cover rounded-lg transition-transform transform group-hover:scale-110"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-10 opacity-0 group-hover:opacity-110 transition-opacity">
                            <FaInstagram className="text-white text-3xl" />
                        </div>
                    </div>
                    <div className="relative group">
                        <img
                            src="https://via.placeholder.com/300" 
                            alt="Instagram 2"
                            className="w-full h-full object-cover rounded-lg transition-transform transform group-hover:scale-110"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-10 opacity-0 group-hover:opacity-100 transition-opacity">
                            <FaInstagram className="text-white text-3xl" />
                        </div>
                    </div>
                    <div className="relative group">
                        <img
                            src="https://via.placeholder.com/300" // Substitua pela URL da imagem real
                            alt="Instagram 3"
                            className="w-full h-full object-cover rounded-lg transition-transform transform group-hover:scale-110"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity">
                            <FaInstagram className="text-white text-3xl" />
                        </div>
                    </div>
                    <div className="relative group">
                        <img
                            src="https://via.placeholder.com/300" // Substitua pela URL da imagem real
                            alt="Instagram 4"
                            className="w-full h-full object-cover rounded-lg transition-transform transform group-hover:scale-110"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity">
                            <FaInstagram className="text-white text-3xl" />
                        </div>
                    </div>
                    <div className="relative group">
                        <img
                            src="https://via.placeholder.com/300" // Substitua pela URL da imagem real
                            alt="Instagram 5"
                            className="w-full h-full object-cover rounded-lg transition-transform transform group-hover:scale-110"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity">
                            <FaInstagram className="text-white text-3xl" />
                        </div>
                    </div>
                    <div className="relative group">
                        <img
                            src="https://via.placeholder.com/300" // Substitua pela URL da imagem real
                            alt="Instagram 6"
                            className="w-full h-full object-cover rounded-lg transition-transform transform group-hover:scale-110"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity">
                            <FaInstagram className="text-white text-3xl" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default InstagramSection;
