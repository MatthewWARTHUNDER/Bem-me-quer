import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";


const CookieConsent = () => {
    const [showBanner, setShowBanner] = useState(false);

    useEffect(() => {
        const consent = Cookies.get("cookie-consent");
        if (!consent) {
            setShowBanner(true);
        }
    }, []);

    const handleAccept = () => {
        Cookies.set("cookie-consent", "true", { expires: 365 });
        setShowBanner(false);
    };

    if (!showBanner) return null;

    return (
        <div className="fixed bottom-0 left-0 w-full bg-NavbarEfooter text-black px-6 py-5 z-50 shadow-xl">
            <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
                <div>
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                        <span role="img" aria-label="cookie">🍪</span> Usamos cookies!
                    </h3>
                    <p className="text-sm mt-1">
                        O site <strong>Bem me quer</strong> utiliza cookies para melhorar sua experiência.
                        Ao continuar, você concorda com nossa{" "}
                        <Link to={'/Privacidade'} className="underline text-dourado hover:text-yellow-300">
                            Política de Privacidade
                        </Link>
                    </p>

                </div>
                <button
                    onClick={handleAccept}
                    className="bg-dourado hover:bg-yellow-500 text-white font-semibold py-2 px-6 rounded-md transition-all"
                >
                    Aceitar e continuar
                </button>
            </div>
        </div>
    );
};

export default CookieConsent;
