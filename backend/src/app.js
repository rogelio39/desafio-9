import 'dotenv/config';
import express from "express";
import mongoose from "mongoose";
import cookieParser from 'cookie-parser';
import passport from 'passport';
import initializePassport from './config/passport.js';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import cors from 'cors';
//rutas de db
import router from './routes/index.routes.js';





const PORT = 4000;

const app = express();


const whiteList = ['http://192.168.100.243:5173']


const corsOptions = {
    origin: function (origin, callback) {
        if (whiteList.indexOf(origin) != -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('access denied'));
        }
    },
    credentials: true
}


app.use(express.json());
app.use(cookieParser(process.env.SIGNED_COOKIE)) // La cookie esta firmada
app.use(session({
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URL,
        mongoOptions: {
            useNewUrlParser: true, //Establezco que la conexion sea mediante URL
            useUnifiedTopology: true //Manego de clusters de manera dinamica
        },
        ttl: 60 //Duracion de la sesion en la BDD en segundos

    }),
    secret: process.env.SESSION_SECRET,
    resave: false, //Fuerzo a que se intente guardar a pesar de no tener modificacion en los datos
    saveUninitialized: false //Fuerzo a guardar la session a pesar de no tener ningun dato
}))
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));

//inicializamos la estrategia
initializePassport();
//para que funcione passport en toda la aplicacion
app.use(passport.initialize());
//inicializamos las sesiones. Hacemos que maneje lo que seria de las sesiones
app.use(passport.session());


//conectando mongoDB atlas con visual studio code.
mongoose.connect(process.env.MONGO_URL)
    .then(async () => {
        console.log('DB is connected');

    }).catch(() => console.log('error en conexion a DB'));



//db routes
app.use('/', router);



app.listen(PORT, () => {
    console.log(`server on PORT ${PORT}`)
})






