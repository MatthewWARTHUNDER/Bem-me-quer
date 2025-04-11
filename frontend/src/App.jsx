import { useState } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Carousel from './components/Carousel'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar/>
      <Carousel/>
      <Footer/>
    </>
  )
}

export default App
