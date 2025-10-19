import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Carousel from './components/Carousel'
import InstagramSection from './components/InstagramSection'
import SectionLoja from './components/SectionLoja'
import CookieConsent from './components/CookiesConsent'
import Admin from './components/admin/Admin'
import AdminLogin from './components/admin/AdminLogin'
import AdminNavbar from './components/admin/AdminNavbar'
import { useNavigate } from 'react-router-dom';
import ProdutosDestaque from './components/ProdutoDestaque';
import CarouselBuques from './components/CarouselBuques';
import SobreNos from './components/SobreNos';
import Diferencias from './components/Diferencias';



function App() {
  const navigate = useNavigate();

  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/produtos')
      .then(res => res.json())
      .then(data => setProdutos(data))
      .catch(err => console.error("Erro ao carregar produtos:", err));
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'l') {
        navigate('/AdminLoginPage');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);

  const handleAddToCart = (produto) => {
    alert(`Adicionar ${produto.nome} ao carrinho!`);
  };

  return (
    <>
      <Navbar />
      <Carousel />


      <ProdutosDestaque produtos={produtos} onAddToCart={handleAddToCart} />

      <SectionLoja />

      <CarouselBuques/>
      <SobreNos/>
      <Diferencias />
      <CookieConsent />
      <InstagramSection />
      <Footer />
    </>
  )
}

export default App
