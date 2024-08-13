import axios from 'axios';

export default function EliminarItem(item) {

    const handleDeleteItem = () => {
        axios
            .delete(`http://localhost:3000/inventario/${item._id}`)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <div className="max-w-md mx-auto mt-10 p-5 border rounded shadow-md">
            <button onClick={handleDeleteItem} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Eliminar
            </button>
        </div>
    )
}