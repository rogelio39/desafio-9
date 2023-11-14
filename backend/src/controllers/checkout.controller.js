import { ticketModel } from "../models/ticket.models.js";
import { cartModel } from "../models/carts.models.js";
import { userModel } from "../models/users.models.js";

export const createTicket = async (req, res) => {
    try {
        let amount = 0;
        let purchaser;
        const { cid } = req.params;
        const cart = await cartModel.findById(cid);
        if (cart){
            cart.products.forEach(prod => {
                amount += prod.quantity * prod.id_prod.price;
            })
            const cartId = cart._id;
            const user = await userModel.findOne({cart: cartId});
            purchaser = user.email;
            const ticket = await ticketModel.create({amount, purchaser});
            if (ticket) {
                console.log(ticket)
                res.status(200).send({ticket})
            } else {
                res.status(404).send({ error: "error al generar ticket. Alguno de los datos no son correctos" });
            }
        } else {
            res.status(404).send({error: "error al procesar carrito", message: error.message})
        }
    } catch (error) {
        res.status(500).send({"error al generar ticket": error});
    }
}