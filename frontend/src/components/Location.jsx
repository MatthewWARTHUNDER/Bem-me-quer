import React from 'react';
import { Link } from "react-router-dom";
const Location = () => {
    return (
        <section id="localizacao" className="p-8 bg-white text-center">
            <h2 className="text-2xl font-bold mb-4">Nossa Localização</h2>
            <p className="mb-4">Venha nos visitar! Estamos aqui:</p>
            <div className="w-full max-w-4xl mx-auto">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3656.261962325364!2d-52.41923858450502!3d-28.26373458231956!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95250b915ea925f9%3A0x1f25b62011d1ff3b!2sRua%20Maur%C3%ADcio%20Cardoso%2C%20110%20-%20Lucas%20Araujo%2C%20Passo%20Fundo%20-%20RS%2C%2099072-080!5e0!3m2!1spt-BR!2sbr!4v1682674062560!5m2!1spt-BR!2sbr"
                    width="100%"
                    height="400"
                    style={{ border: 10 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </div>
        </section>
    );
};

export default Location;
