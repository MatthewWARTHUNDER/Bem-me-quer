import React from 'react';
import { FaInstagram } from 'react-icons/fa';
import FloresVermelhas from '../assets/FloresVermelhas.jpg';
import { CiHeart } from "react-icons/ci";
import FloresNobres from '../assets/FloresNobres.jpg'

const Imageminstagram = [
    { imagem: FloresVermelhas, link: 'https://www.instagram.com/p/DHt9SMhxQVx/,', likes: 12},
    { imagem: FloresNobres, link: 'https://www.instagram.com/p/DHweGJtxWeU/', likes: 13},
    { imagem: FloresVermelhas, link: '' },
    { imagem: FloresVermelhas, link: '' },
    { imagem: FloresVermelhas, link: '' },
    { imagem: FloresVermelhas, link: '' },
];

const InstagramSection = () => {
    return (
        <section className="bg-gray-100 py-16">
            <div className="max-w-screen-xl mx-auto px-4 text-center">
                <h1 className="text-3xl font-bold mb-4">Nos segue</h1>
                <p className="text-lg mb-8">@bem_me_quer_floresepresentes</p>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-[20px]">
                    {Imageminstagram.map((item, index) => (
                        <a
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            key={index}
                            className="relative group"
                        >
                            <img
                                src={item.imagem}
                                alt={`Instagram ${index + 1}`}
                                className="w-90 h-50 object-cover rounded-lg transition-transform transform group-hover:scale-100"
                            />
                            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-1 opacity-0 group-hover:opacity-50 transition-opacity rounded-lg">
                                <FaInstagram className="text-white text-3xl" />
                                <CiHeart className="text-white text-3xl" />
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default InstagramSection;
