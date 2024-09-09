import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import url from "../../utils";

export default function AgregarPrestamo() {
    const navigate = useNavigate();

    const [newPrestamo, setNewPrestamo] = useState({
        rut: "",
        id_producto: "",
        nombre_producto: "",
        timestamp: "",
        monto: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewPrestamo((prevPrestamo) => ({
            ...prevPrestamo,
            [name]: value,
        }));
    }

    const handleAddPrestamo = () => {
        axios
            .post(url + "/prestamos", newPrestamo)
            .then((res) => {
                setNewPrestamo({
                    rut: "",
                    id_producto: "",
                    nombre_producto: "",
                    timestamp: "",
                    monto: "",
                });
                navigate("/");
                console.log(res);

            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <div className="max-w-md mx-auto mt-10 p-5 border rounded shadow-md">
            <h2 className="text-2xl font-bold mb-5">Agregar Préstamo</h2>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="rut">Rut</label>
                <input 
                    type="text" 
                    placeholder="Rut" 
                    name="rut" 
                    value={newPrestamo.rut}
                    onChange={handleChange} 
                    className="input input-bordered w-full max-w-xs"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="id_producto">ID Producto</label>
                <input 
                    type="text" 
                    placeholder="ID Producto" 
                    name="id_producto"
                    value={newPrestamo.id_producto}
                    onChange={handleChange} 
                    className="input input-bordered w-full max-w-xs"
                />
            </div>
            <button
                onClick={handleAddPrestamo}
                className="btn btn-xs sm:btn-md lg:btn-lg"
            >
                Agregar
            </button>
        </div>
    )
}