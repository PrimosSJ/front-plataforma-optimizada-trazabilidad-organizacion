import { useEffect, useState } from "react";
import io from "socket.io-client";
import axios from "axios";

import url from "../utils";
import AgregarItem from "./inventario/AgregarItem";

const socket = io(url);

export default function Inventario() {
    const [inventory, setInventory] = useState([]);
    
    useEffect(() => {
        axios
        .get(url + "/inventario")
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
            {inventory && (
                <div className="container mx-auto p-4">
                    <h1 className="text-3xl font-bold mb-6 text-center">Inventario</h1>
                    <div className="overflow-x-auto">
                        <table className="table table-zebra w-full">
                            <thead>
                                <tr>
                                    <th className="text-left">Nombre</th>
                                    <th className="text-left">ID</th>
                                    <th className="text-left">Descripción</th>
                                    <th className="text-left">Precio</th>
                                    <th className="text-left">Categoría</th>
                                    <th className="text-left">Stock</th>
                                    <th className="text-center">Acciones</th>
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
                                        <td className="text-center">
                                            <a 
                                                href={`/inventario/${item._id}`} 
                                                className="btn btn-primary btn-sm"
                                            >
                                                Editar
                                            </a>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            <AgregarItem />
        </>

    )
}