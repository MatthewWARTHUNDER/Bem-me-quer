import { useSearchParams } from "react-router-dom";
import Resultadopesquisa from "../components/Resultadospesquisa"; 
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function ProdutoPesquisa() {
    const [searchParams] = useSearchParams();
    const busca = searchParams.get("busca");

    return (
        <>
        <Navbar/>
            <Resultadopesquisa termoBusca={busca} /> 
        <Footer/>
        </>
    );
}
