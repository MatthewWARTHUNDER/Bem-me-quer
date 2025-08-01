import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SobreComponente from "../components/SobreComponente";
import { useNavigate } from 'react-router-dom';

function sobre() {

    const navigate = useNavigate();

    useEffect(() => {

        if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'l') {
            navigate('/AdminLoginPage');
        }

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [navigate])


}


export default function Sobre() {
    return (
        <>
            <Navbar />
            <SobreComponente />
            <Footer />

        </>
    )
}