import { useEffect, useState } from "react";
import io from "socket.io-client";
import axios from "axios";

import AgregarItem from "./inventario/AgregarItem";
import ItemView from "./inventario/ItemView";

const socket = io("http://localhost:3000");

export default function Inventario() {
    const [inventory, setInventory] = useState([]);
    
    useEffect(() => {
        axios
        .get("http://localhost:3000/inventario")
        .then((res) => {
            setInventory(res.data);
        })
        .catch((err) => {
            console.log(err);
        });
    
        socket.on("inventoryUpdate", (data) => {
            setInventory(data);
            console.log(data);
        });
    
        return () => {
            socket.off("inventoryUpdate");
        };
    });
    
    return (
        <>

        {inventory &&
            <div>
            <h1>Inventario</h1>
            <table>
            <thead>
                <tr>
                <th>Nombre</th>
                <th>ID</th>
                <th>Descripción</th>
                <th>Precio</th>
                <th>Categoría</th>
                <th>Stock</th>
                </tr>
            </thead>
            <tbody>
                {inventory.map((item) => (
                <tr key={item._id}>
                    <td>{item.nombre}</td>
                    <td>{item._id}</td>
                    <td>{item.descripcion}</td>
                    <td>{item.precio}</td>
                    <td>{item.categoria}</td>
                    <td>{item.stock}</td>
                    <td>
                        <button 
                            href={`/inventario/${item._id}`}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Editar
                        </button>
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
            </div>
        }

        <AgregarItem />
        </>
    )
}