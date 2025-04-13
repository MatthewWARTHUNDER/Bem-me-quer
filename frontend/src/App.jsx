import { useState } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Carousel from './components/Carousel'
import Location from './components/Location'
import InstagramSection from './components/InstagramSection'
function App() {


  return (
    <>
      <Navbar/>
      <Carousel/>
      <InstagramSection/>
      <Location/>
      <Footer/>
    </>
  )
}

export default App
