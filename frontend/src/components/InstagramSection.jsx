import React from 'react';
import { FaInstagram } from 'react-icons/fa';
import FloresVermelhas from '../assets/FloresVermelhas.jpg';
import FloresNobres from '../assets/FloresNobres.jpg';
import instagramFlor from '../assets/instagramFotos/instagramFlor.png';
import instagramFlor2 from '../assets/instagramFotos/instagramFlor2.png';
import instagramFlor3 from '../assets/instagramFotos/instagramFlor3.png';
import instagramFlor4 from '../assets/instagramFotos/instagramFlor4.png';

const Imageminstagram = [
    { imagem: FloresVermelhas, link: 'https://www.instagram.com/p/DHt9SMhxQVx/' },
    { imagem: FloresNobres, link: 'https://www.instagram.com/p/DHweGJtxWeU/' },
    { imagem: instagramFlor, link: 'https://www.instagram.com/p/DIoTdRSxAMC/' },
    { imagem: instagramFlor2, link: 'https://www.instagram.com/p/DIb4wlMR3T5/' },
    { imagem: instagramFlor3, link: 'https://www.instagram.com/p/DIB9_IwRS-q/' },
    { imagem: instagramFlor4, link: 'https://www.instagram.com/p/DCo8GpBRZB4/' }
];

const InstagramSection = () => {
    return (
        <section className="bg-CorDeFundo py-16">
            <div className="max-w-screen-xl mx-auto px-4 text-center">
                <h2 className="text-5xl font-vibes text-VerdeMusgo mb-2">Siga-nos no Instagram</h2>
                <a 
                    href="https://www.instagram.com/bem_me_quer_floresepresentes/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg text-gray-600 hover:text-VerdeMusgo transition-colors duration-300 mb-8 inline-block"
                >
                    @bem_me_quer_floresepresentes
                </a>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-10">
                    {Imageminstagram.map((item, index) => (
                        <a
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            key={index}
                            className="relative group aspect-square block overflow-hidden rounded-lg shadow-md"
                        >
                            <img
                                src={item.imagem}
                                alt={`Post do Instagram ${index + 1}`}
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 flex items-center justify-center  bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300">
                                <FaInstagram className="text-white text-4xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </div>
                        </a>
                    ))}
                </div>

                <a
                    href="https://www.instagram.com/bem_me_quer_floresepresentes/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-verde text-white font-semibold px-8 py-3 rounded-full shadow-lg transition-transform duration-200 ease-in-out hover:scale-105"
                >
                    <FaInstagram />
                    Ver mais no Instagram
                </a>
            </div>
        </section>
    );
};

export default InstagramSection;