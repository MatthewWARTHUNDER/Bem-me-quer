import { Link } from "react-router-dom";
import Produto from "../components/Produto";
import  Navbar from "../components/Navbar";
import Footer from "../components/Footer"; 

export default function Loja(){
    return(
        <>
        <Navbar/>
        <Produto/>
        <Footer/>
        </>
    )
}