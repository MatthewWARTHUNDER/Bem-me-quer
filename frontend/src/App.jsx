import React, { useEffect } from 'react';
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Carousel from './components/Carousel'
import InstagramSection from './components/InstagramSection'
import SectionLoja from './components/SectionLoja'
import CookieConsent from './components/CookiesConsent'
import Checkout from './components/Checkout'
import Admin from './components/admin/Admin'
import AdminLogin from './components/admin/AdminLogin'
import AdminNavbar from './components/admin/AdminNavbar'
import { useNavigate } from 'react-router-dom';






function App() {

  const navigate = useNavigate();

  useEffect(() => {


    const handleKeyDown = (e) => {
      // Exemplo: ctrl + alt + A para ir pro login admin
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'l') {
        navigate('/AdminLoginPage');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);


  return (
    <>

      {/* <AdminNavbar /> */}
      {/* <Admin/> */}
      <Navbar />
      <Carousel />
      <SectionLoja />
      <InstagramSection />
      <CookieConsent />
      <Footer />
      {/* <AdminLogin /> */}
    </>
  )
}

export default App
