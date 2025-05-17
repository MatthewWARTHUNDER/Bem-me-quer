
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Carousel from './components/Carousel'
import InstagramSection from './components/InstagramSection'
import SectionLoja from './components/SectionLoja'
import CookieConsent from './components/CookiesConsent'
import Checkout from './components/Checkout'
import Admin from './components/admin/Admin'




function App() {


  return (
    <>

    {/* <Admin/> */}
      <Navbar/>
      <Carousel/>
      <SectionLoja/>
      <InstagramSection/>
      <CookieConsent/>
      <Footer/>
    </>
  )
}

export default App
