import { useEffect, useState } from "react";
import io from "socket.io-client";
import axios from "axios";

const socket = io("http://localhost:3000");

export default function Inventario() {
    const [inventory, setInventory] = useState([]);
    const [newItem, setNewItem] = useState({
        nombre: "",
        descripcion: "",
        precio: "",
        categoria: "",
        stock: "",
    });
    
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
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewItem((prevItem) => ({
            ...prevItem,
            [name]: value,
        }));
    };
    
    const handleAddItem = () => {
        axios
        .post("http://localhost:3000/inventario", newItem)
        .then((res) => {
            setNewItem({
            nombre: "",
            descripcion: "",
            precio: "",
            categoria: "",
            stock: "",
            });
            console.log(res);
        })
        .catch((err) => {
            console.log(err);
        });
    };
    
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
                </tr>
                ))}
            </tbody>
            </table>
            </div>
        }
        <div>
            <h2>Agregar producto</h2>
            <input
            type="text"
            name="nombre"
            value={newItem.nombre}
            onChange={handleChange}
            placeholder="Nombre"
            />
            <input
            type="text"
            name="descripcion"
            value={newItem.descripcion}
            onChange={handleChange}
            placeholder="Descripción"
            />
            <input
            type="number"
            name="precio"
            value={newItem.precio}
            onChange={handleChange}
            placeholder="Precio"
            />
            <input
            type="text"
            name="categoria"
            value={newItem.categoria}
            onChange={handleChange}
            placeholder="Categoría"
            />
            <input
            type="number"
            name="stock"
            value={newItem.stock}
            onChange={handleChange}
            placeholder="Stock"
            />
            <button onClick={handleAddItem}>Agregar producto</button>

        </div>
        </>
    )
}