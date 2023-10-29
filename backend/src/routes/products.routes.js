import { Router } from "express";
import {getProducts ,getProduct, postProduct, putProduct, deleteProduct } from "../controllers/products.controller.js";
import { passportError, authorization } from "../utils/messagesError.js";


const productRouter = Router();


productRouter.get('/', getProducts)
productRouter.get('/:id', getProduct);
productRouter.post('/', passportError('jwt'), authorization('admin'), postProduct);
productRouter.put('/:id', passportError('jwt'), authorization('admin'), putProduct);
productRouter.delete('/:id', passportError('jwt'), authorization('admin'), deleteProduct);




export default productRouter;