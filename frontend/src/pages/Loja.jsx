import { Link } from "react-router-dom";
import LojaComponente from "../components/LojaComponente";
import  Navbar from "../components/Navbar";
import Footer from "../components/Footer"; 


export default function Loja(){
    return(
        <>
        <Navbar/>
        <LojaComponente/>
        <Footer/>
        </>
    )
}