import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

import url from "../../utils";

function validarRut(rut) {
    const rutPattern = /^\d{1,2}\.\d{3}\.\d{3}-[0-9kK]{1}$/;

    if (!rutPattern.test(rut)) {
        return false;
    }

    let cleanRut = rut.replace(/\./g, "").replace("-", "");
    let rutBody = cleanRut.slice(0, -1);
    let dv = cleanRut.slice(-1).toLowerCase();

    let suma = 0;
    let multiplo = 2;

    for (let i = rutBody.length - 1; i >= 0; i--) {
        suma += multiplo * rutBody.charAt(i);
        multiplo = multiplo < 7 ? multiplo + 1 : 2;
    }

    let expectedDv = 11 - (suma % 11);
    if (expectedDv === 11) expectedDv = '0';
    if (expectedDv === 10) expectedDv = 'k';

    return dv === expectedDv.toString();
}

export default function AgregarPrestamo() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [rutError, setRutError] = useState(false);

    const [newPrestamo, setNewPrestamo] = useState({
        rut: "",
        id_producto: id,
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

        if (name === "rut") {
            setRutError(!validarRut(value));
        }
    }

    function handleAddPrestamo() {
        if (rutError || !validarRut(newPrestamo.rut)) {
            return (
                <>
                    <div className="alert alert-error">Rut inválido</div>
                </>
            )
        }
        else{
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
                    className={`input input-bordered w-full max-w-xs ${rutError ? 'border-red-500' : ''}`}
                />
                {rutError && <p className="text-red-500 text-xs italic">Rut inválido</p>}
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