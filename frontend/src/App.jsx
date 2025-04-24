import { useState } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Carousel from './components/Carousel'
import InstagramSection from './components/InstagramSection'
import Loja from './pages/Loja'
import Localizacao from './pages/Localizacao'


function App() {


  return (
    <>
      <Navbar/>
      <InstagramSection/>
      <Footer/>
    </>
  )
}

export default App
