import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import Checkout from "../components/Checkout"
import { initMercadoPago } from '@mercadopago/sdk-react';
initMercadoPago('TEST-cd12caa2-b4c6-4b45-b1ad-6d54563686fd');



export default function Checkoutpage(){
    return(
        <>
        <Navbar/>
        <Checkout/>
        <Footer/>

        </>
    )
}