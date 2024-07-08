import { useEffect, useState } from "react";
import io from "socket.io-client";
import axios from "axios";

const socket = io("http://localhost:3000");

export default function Prestamos() {
    const [prestamos, setPrestamos] = useState([]);
    const [newPrestamo, setNewPrestamo] = useState({
        rut: "",
        id_producto: "",
        nombre_producto: "",
        timestamp: "",
        monto: "",
    });

    useEffect(() => {
        axios
        .get("http://localhost:3000/prestamos")
        .then((res) => {
            setPrestamos(res.data);
        })
        .catch((err) => {
            console.log(err);
        });

        socket.on("prestamosUpdate", (data) => {
            setPrestamos(data);
            console.log(data);
        });

        return () => {
            socket.off("prestamosUpdate");
        };
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewPrestamo((prevPrestamo) => ({
            ...prevPrestamo,
            [name]: value,
        }));
    };

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
    };

    return (
        <>
            {prestamos && 
                <div>
                <h1>Prestamos</h1>
                <table>
                <thead>
                    <tr>
                    <th>Rut</th>
                    <th>Producto</th>
                    <th>Timestamp</th>
                    <th>Estado</th>
                    </tr>
                </thead>
                <tbody>
                    {prestamos.map((prestamo) => (
                        <tr key={prestamo._id}>
                            <td>{prestamo.rut}</td>
                            <td>{prestamo.nombre_producto}</td>
                            <td>{prestamo.timestamp}</td>
                            <td>{prestamo.finalizado ? "Finalizado": "Vigente"}</td>
                        </tr>
                    ))}
                </tbody>
                </table>
                </div>
            }
            <div>
                <h2>Agregar prestamo</h2>
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
            </div>
        </>
    )
}