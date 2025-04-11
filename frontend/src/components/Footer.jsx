
import React from 'react';

const Footer = () => {
    return (
        <footer className=" bg-NavbarEfooter ">
            <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
                <div className="md:flex md:justify-between">
                    <div className="mb-6 md:mb-0">
                        <a href="" className="flex items-center">
                            <img
                                src=""
                                className="h-8 me-3"
                                alt="Bem me quer logo"
                            />
                            <span className="self-center text-2xl font-semibold text-black font-semibold">
                                Bem-me-quer
                            </span>
                        </a>
                    </div>
                    <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
                        <div>
                            <h2 className="mb-6 text-sm font-semibold  uppercase text-black ">
                                Entre em contato
                            </h2>
                            <ul className="text-white hover:text-gray-200 delay-150 font-medium">
                                
                                <li>
                                    <a href="" className=" text-black hover:text-dourado transition-colors duration-150">
                                        Email: BemMequer@gmail.com
                                    </a>
                                </li>
                                <li>
                                    <a href="" className="text-black hover:text-dourado transition-colors duration-150">
                                        whatssap: +54 9 9917-9427
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="mb-6 text-sm font-semibold uppercase text-black">
                                Nossas mídias sociais
                            </h2>
                            <ul className=" font-medium">
                                <li className="mb-4 text-white hover:text-gray-200 delay-150 font-medium">
                                    <a
                                        href=""
                                        className="text-black hover:text-dourado transition-colors duration-150"
                                    >
                                        Instagram
                                    </a>
                                </li>
                                <li className="mb-4 text-white hover:text-gray-200 delay-150 font-medium">
                                    <a href="" className="text-black hover:text-dourado transition-colors duration-150">
                                        Tiktok
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div>
                        </div>
                    </div>
                </div>
                <hr className="my-6 border-black sm:mx-auto" />
                <div className="sm:flex sm:items-center sm:justify-between">
                    <span className="text-black hover:text-dourado transition-colors duration-150 font-medium">
                        © 2025{' '}
                        <a href="" className="hover:underline">
                            Bem-me-Quer™
                        </a>
                        . Todos direitos reservados.
                    </span>
                    </div>
            </div>
        </footer>
    );
};

export default Footer;
