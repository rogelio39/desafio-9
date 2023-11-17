import { ticketModel } from "../models/ticket.models.js";
import { cartModel } from "../models/carts.models.js";
import { userModel } from "../models/users.models.js";
import { productModel } from "../models/products.models.js";

export const createTicket = async (req, res) => {
    try {
        let amount = 0;
        let purchaser;
        let product;
        const { cid } = req.params;
        const cart = await cartModel.findById(cid);
        const cartId = cart._id;
        const user = await userModel.findOne({ cart: cartId });
        purchaser = user.email;
        if (cart) {
            //FILTRAR PRODUCTOS QUE SUPEREN EL STOCK PARA AGREGARLOS A LA ORDEN DEL CHECKOUT
            const filteredProducts = await Promise.all(cart.products.map(async (prod) => {
                product = await productModel.findById(prod.id_prod._id);
                if (!(prod.quantity < product.stock)) {
                    return null
                }
                else {
                    const updatedStock = product.stock - prod.quantity;
                    await productModel.findByIdAndUpdate(product._id, {stock: updatedStock});
                    return prod;
                }
            }));
            // Filtra los productos que cumplen la condición y elimina los nulos
            const validProducts = filteredProducts.filter(Boolean);

            //ACTUALIZAR CARRITO PARA QUE QUEDE SOLO CON AQUELLOS PRODUCTOS CUYA CANTIDAD FUE SUPERIOR AL STOCK

            const updatedCart = await Promise.all(cart.products.map(async (prod) => {
                product = await productModel.findById(prod.id_prod._id);
                return prod.quantity > product.stock ? prod : null;
            } ))

            const finalCart = updatedCart.filter(Boolean);
            await cartModel.findByIdAndUpdate(cartId, {products: finalCart})
            if (validProducts.length > 0) {
                validProducts.forEach(prod => {
                    amount += prod.quantity * prod.id_prod.price;
                })
                const ticket = await ticketModel.create({ amount, purchaser });
                console.log("ticket", ticket)
                if (ticket) {
                    res.status(200).send({ ticket })
                } else {
                    res.status(404).send({ error: "error al generar ticket. Alguno de los datos no son correctos" });
                }
            } else {
                res.status(404).send({ error: "No hay productos válidos en el carrito" });
            }
        } else {
            res.status(404).send({ "error al procesar carrito": error })
        }
    } catch (error) {
        res.status(500).send({ "error al generar ticket": error });
    }
}