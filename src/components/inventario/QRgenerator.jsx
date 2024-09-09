import { QRCodeCanvas } from "qrcode.react";

export default function QRgenerator({ id }) {
    return (
        <div className="flex flex-col items-center justify-center p-4 border rounded shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Código QR del Item</h2>
            <QRCodeCanvas 
                value={id}
                size={256} 
                bgColor={"#ffffff"} 
                fgColor={"#000000"} 
                level={"H"}
            />
            <p className="mt-4 text-lg">ID del ítem: {id}</p>
        </div>
    );
}
