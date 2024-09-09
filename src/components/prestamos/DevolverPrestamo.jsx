import axios from "axios";

import url from "../../utils";

export default function MarcarDevuelto(prestamo) {

    const handleClick = (e) => {
        e.preventDefault();
        axios
           .patch(url + `/prestamos/return/${prestamo._id}`)
           .then((res) => {
                console.log(res);
            })
           .catch((err) => {
                console.log(err);
            });
    };

    return (
            <>
                <button 
                    onClick={handleClick}
                    disabled={prestamo.finalizado}    
                    className={`btn btn-sm ${prestamo.finalizado ? 'btn-disabled' : 'btn-primary'}`}
                >
                    Marcar Devuelto
                </button>
            </>
    )
}