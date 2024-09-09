import { Link } from 'react-router-dom';

export default function NavBar() {
    return (
            <div className='container mx-auto flex justify-between'>
                <Link to='/inventario' className='text-dark-300 font-bold py-2 px-4 rounded hover:bg-dark-400'>
                    Inventario
                </Link>
                <Link to='/' className='text-dark-300 font-bold py-2 px-4 rounded hover:bg-dark-400'>
                    Prestamos
                </Link>
                <Link to='/historial_rut' className='text-dark-300 font-bold py-2 px-4 rounded hover:bg-dark-400'>
                    Historial por Rut
                </Link>
                <Link to='/new_prestamo' className='text-dark-300 font-bold py-2 px-4 rounded hover:bg-dark-400'>
                    Nuevo Préstamo
                </Link>
            </div> 

    )
}
