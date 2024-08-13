import { useEffect, useState } from "react";
import io from "socket.io-client";
import axios from "axios";

import AgregarPrestamo from "./prestamos/AgregarPrestamo";
import PrestamosPorRut from "./prestamos/GetAllByRut";

const socket = io("http://localhost:3000");

export default function Prestamos() {
    const [prestamos, setPrestamos] = useState([]);

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
            <AgregarPrestamo />
            <PrestamosPorRut />
        </>
    )
}