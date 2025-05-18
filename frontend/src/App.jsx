
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




function App() {


  return (
    <>

      <AdminNavbar />
      <Admin/>
      {/* <Navbar/>
      <Carousel/>
      <SectionLoja/>
      <InstagramSection/>
      <CookieConsent/>
      <Footer/>  */}
      {/* <AdminLogin /> */}
    </>
  )
}

export default App
