import { useState } from "react";
import axios from "axios";

export default function AgregarPrestamo() {
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
            .post("http://localhost:3000/prestamos", newPrestamo)
            .then((res) => {
                setNewPrestamo({
                    rut: "",
                    id_producto: "",
                    nombre_producto: "",
                    timestamp: "",
                    monto: "",
                });
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <>
            <h2>Agregar préstamo</h2>
            <input 
                type="text" 
                placeholder="Rut" 
                name="rut" 
                value={newPrestamo.rut}
                onChange={handleChange} 
            />
            <input 
                type="text" 
                placeholder="ID Producto" 
                name="id_producto"
                value={newPrestamo.id_producto}
                onChange={handleChange} 
            />
            <button onClick={handleAddPrestamo}>Agregar</button>
        </>
    )
}