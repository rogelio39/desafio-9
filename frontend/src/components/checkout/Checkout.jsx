import { useState } from "react";
import Ticket from "../ticket/Ticket";


const Checkout = () => {

    const [ticket, setTicket] = useState({});
    const [viewButtonOrder, setViewButtonOrder] = useState(false);
    const [showOrderDetails, setShowOrderDetails] = useState(false);

    const getTicket = async () => {

        try {
            const response = await fetch('http://localhost:4000/api/checkout/652d64699198c0473c2c1aa2', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            if (response.ok) {
                const data = await response.json();
                console.log("orden de compra generada con exito");
                console.log(data.ticket.code)
                setTicket(data.ticket);
            } else if (response.status === 401) {
                console.error('Error al registrarse', response);
            } else {
                console.log(response)
            }
        } catch (error) {
            console.log('error al registrarse', error);
        }

        setViewButtonOrder(true);
    }

    const getCheckout = async () => {
        setShowOrderDetails(true);
    }



    return (
        <div>
            <button onClick={getTicket}>REALIZAR COMPRA</button>
            {
                viewButtonOrder && <button onClick={getCheckout}>VER DETALLES DE COMPRA</button>
            }
            {
                showOrderDetails && <Ticket ticket={ticket} />
            }
        </div>
    )
}

export default Checkout
