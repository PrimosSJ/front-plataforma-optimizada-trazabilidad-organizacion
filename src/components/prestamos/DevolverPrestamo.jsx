import axios from "axios";

export default function MarcarDevuelto(prestamo) {

    const handleClick = (e) => {
        e.preventDefault();
        axios
           .patch(`http://localhost:3000/prestamos/return/${prestamo._id}`)
           .then((res) => {
                console.log(res);
            })
           .catch((err) => {
                console.log(err);
            });
    };

    return (
        <>
            <button onClick={handleClick}>Marcar Devuelto</button>
        </>
    )
}