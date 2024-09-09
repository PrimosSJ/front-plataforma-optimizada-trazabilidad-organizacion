import { BrowserRouter, Route, Routes } from 'react-router-dom'

import './App.css'

import Inventario from './components/Inventario'
import Prestamos from './components/Prestamos'
import ItemView from './components/inventario/ItemView'
import GetAllByRut from './components/prestamos/GetAllByRut'
import AgregarPrestamo from './components/prestamos/AgregarPrestamo'
import NavBar from './components/NavBar'

function App() {
  return (
    <>
      <h1 className='text-3xl font-bold'>
        Plataforma Optimizada de Trazabilidad y Organización
      </h1>
      <hr />

      <BrowserRouter>

        <NavBar />

        <Routes>
          <Route path='/inventario' element={<Inventario />} />
          <Route path='/inventario/:id' element={<ItemView />} />
          <Route path='/historial_rut' element={<GetAllByRut />} />
          <Route path='/new_prestamo' element={<AgregarPrestamo />} />
          <Route path='/' element={<Prestamos />} />
        </Routes>

      </BrowserRouter>
    </>
  )
}

export default App
