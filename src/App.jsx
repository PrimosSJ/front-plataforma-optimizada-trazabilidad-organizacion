import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'

import './App.css'

import Inventario from './components/Inventario'
import Prestamos from './components/Prestamos'
import NavBar from './components/NavBar'

function App() {


  return (
    <>
      <h1>
        Plataforma Optimizada de Trazabilidad y Organización
      </h1>
      <hr />

      <BrowserRouter>

        <NavBar />

        <Routes>
          <Route path='/inventario' element={<Inventario />} />
          <Route path='/' element={<Prestamos />} />
        </Routes>

      </BrowserRouter>
    </>
  )
}

export default App
