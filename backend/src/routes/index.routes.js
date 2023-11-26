import { Router } from "express";
import cartRouter from './cart.routes.js';
import productRouter from './products.routes.js';
import userRouter from './users.routes.js';
import sessionRouter from './session.routes.js';
import checkoutRouter from "./checkout.routes.js";
import nodemailerRouter from "./nodemailer.routes.js";


const router = Router();

router.use('/api/users', userRouter);
router.use('/api/products', productRouter);
router.use('/api/carts', cartRouter);
router.use('/api/sessions', sessionRouter);
router.use('/api/checkout', checkoutRouter);
router.use('/api/mail', nodemailerRouter);




export default router;