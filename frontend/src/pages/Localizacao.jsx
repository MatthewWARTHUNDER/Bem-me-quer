import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Mapa from "../components/Mapa"; 

import Navbar from "../components/Navbar";

export default function Localizacao() {
    return (
        <>
            <Navbar />
            <Mapa/>
            <Footer />
        </>
    );
}



