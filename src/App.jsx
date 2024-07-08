import Inventario from './components/Inventario'
import Prestamos from './components/Prestamos'
import PrestamoByRut from './components/prestamos/GetAllByRut'

function App() {


  return (
    <>
      <PrestamoByRut />
      <Inventario />
      <Prestamos />
    </>
  )
}

export default App
