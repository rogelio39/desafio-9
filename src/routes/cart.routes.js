import { Router } from "express";
import { deleteCart, deleteProdCart, getCart, postCart, putProductToCart, putUpdatedQuantityProductToCart} from "../controllers/cart.controller.js";

const cartRouter = Router();

cartRouter.get('/:cid', getCart);
cartRouter.post('/:cid/product/:pid', postCart);
cartRouter.delete('/:cid/product/:pid', deleteProdCart);
cartRouter.put('/:cid', putProductToCart);
cartRouter.put('/:cid/product/:pid', putUpdatedQuantityProductToCart);
cartRouter.delete('/:cid', deleteCart)



export default cartRouter;