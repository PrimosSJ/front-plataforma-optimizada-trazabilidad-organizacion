import { useEffect, useState } from "react";
import axios from "axios";
import io from "socket.io-client";

import MarcarDevueto from "./DevolverPrestamo";

const socket = io("http://localhost:3000");

export default function PrestamosPorRut() {
    const [lista, setLista] = useState([]);
    const [rut, setRut] = useState("");

    const handleChange = (e) => {
        setRut(e.target.value);
    };

    const handleClick = (e) => {
        e.preventDefault();
        axios
           .get(`http://localhost:3000/prestamos/history/${rut}`)
           .then((res) => {
                setLista(res.data);
            })
           .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        axios
        .get(`http://localhost:3000/prestamos/history/${rut}`)
        .then((res) => {
            setLista(res.data);
        })
        .catch((err) => {
            console.log(err);
        });

        socket.on("prestamosUpdate", (data) => {
            setLista(data);
            console.log(data);
        });

        return () => {
            socket.off("prestamosUpdate");
        };
    }, [rut]);

    return (
        <>
            <h1>Historial de préstamos por rut</h1>
            <input type="text" placeholder="Rut" onChange={handleChange} />
            <button onClick={handleClick}>Buscar</button>
            <table>
                <thead>
                    <tr>
                        <th>Rut</th>
                        <th>Nombre</th>
                        <th>Producto</th>
                        <th>Fecha</th>
                        <th>Monto</th>
                    </tr>
                </thead>
                <tbody>
                    {lista.map((prestamo) => (
                        <tr key={prestamo._id}>
                            <td>{prestamo.rut}</td>
                            <td>{prestamo.nombre}</td>
                            <td>{prestamo.nombre_producto}</td>
                            <td>{prestamo.timestamp}</td>
                            <td>{prestamo.monto}</td>
                            <td>{prestamo.finalizado ? "Devuelto" : <MarcarDevueto {...prestamo}/>}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}