import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import EliminarItem from './EliminarItem';

export default function ItemView() {
    const { id } = useParams();
    const [item, setItem] = useState(null);

    useEffect(() => {
        axios
            .get(`http://localhost:3000/inventario/${id}`)
            .then((res) => {
                setItem(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setItem((prevItem) => ({
            ...prevItem,
            [name]: value,
        }));
    }

    const handleSave = () => {
        axios
           .put(`http://localhost:3000/inventario/${id}`, item)
           .then((res) => {
                console.log(res);
                history.push('/inventario');
            })
           .catch((err) => {
                console.log(err);
            });
    }

    if (!item) {
        return <p>Loading...</p>;
    }

    return (
        <div className="max-w-md mx-auto mt-10 p-5 border rounded shadow-md">
            <h2 className="text-2xl font-bold mb-5">Editar Item</h2>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">Nombre</label>
                <input
                    type="text"
                    placeholder="Nombre"
                    name="nombre"
                    value={item.nombre}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="descripcion">Descripción</label>
                <input
                    type="text"
                    placeholder="Descripción"
                    name="descripcion"
                    value={item.descripcion}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="precio">Precio</label>
                <input
                    type="text"
                    placeholder="Precio"
                    name="precio"
                    value={item.precio}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>
            <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="categoria">Categoría</label>
                <select
                    name="categoria"
                    value={item.categoria}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                    <option value="">Selecciona una categoría</option>
                    <option value="bebida">Oficina</option>
                    <option value="comida">Redes</option>
                    <option value="postre">LPA</option>
                    <option value="postre">Feria</option>
                </select>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="stock">Stock</label>
                <input
                    type="text"
                    placeholder="Stock"
                    name="stock"
                    value={item.stock}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>
            <button onClick={handleSave} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Guardar
            </button>
            <EliminarItem item={item} />
        </div>

    )
}

