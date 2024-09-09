import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import url from '../../utils';

export default function EliminarItem({ id }) {
    const navigate = useNavigate();

    const handleDeleteItem = () => {
        axios
            .delete(url + `/inventario/${id}`)
            .then((res) => {
                console.log(res);
                navigate("/inventario");
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