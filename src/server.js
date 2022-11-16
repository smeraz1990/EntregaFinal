import express, { json } from "express";
import session from "express-session"
import mongoose from "mongoose";
import config from "./config/config.js";
import routes from "./routes/index.js";
import { engine } from 'express-handlebars';
import path from 'path';
import {fileURLToPath} from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import { Server } from "socket.io";
import compression from 'compression'
import datosLogin from './components/LoginStategy.js'
import passport from 'passport';
import MensajesController from './controllers/mensaje.controller.js'
const app = express();

const servidor = app.listen(config.port, () => {
  console.log(`Server listening host http://localhost:${config.port}`);
});

app.use(json());
app.use(compression())
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: config.apisecret,
  resave: false,
  saveUninitialized: false,
  rolling: true,
  cookie:{
      httpOnly:false,
      secure: false,
      maxAge: config.tiemposession
  }
}))
app.use(passport.initialize());
app.use(passport.session());
passport.use('register',datosLogin.registerStrategy)
passport.use('login',datosLogin.loginStrategy)

passport.serializeUser((user,done)=>{
    done(null,user.id)
})

passport.deserializeUser((id,done)=>{
    datosLogin.User.findById(id,done)
})
app.use(express.static(path.join(__dirname, '../views')))
app.use(express.static('avatars'))
app.use(express.static('productsImg'))
app.engine('hbs', engine({
  defaultLayout: path.join(__dirname, '../views/layouts/main.hbs'),
  layoutsDir: path.join(__dirname, '../views/layouts'),
  helpers: {
    Multiplicacion: function(precio,cantidad){
      return precio * cantidad
    }
  }
}))
app.set('view engine', '.hbs');
//Direccionamiento a las rutas
app.use("/", routes);



app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname,"../views/404.html"));
});

mongoose.connect(config.dbUrl).then(() => {
  console.log("Database connected!");
});

const expressServer = servidor
const io = new Server(expressServer);

let messagesArray = []
io.on('connection', async socket => {
  messagesArray = await MensajesController.ReadMensajes()
  socket.emit('server:mensajes', messagesArray)
  socket.on('client:menssage', async messageInfo => {
    //console.log("datos a guardar",messageInfo)
      //fs.appendFileSync(`./Messages/appMensajes.txt`, JSON.stringify(messageInfo))
      await MensajesController.createMensaje(messageInfo)
      messagesArray = await MensajesController.ReadMensajes()
      io.emit('server:mensajes', messagesArray)
          //console.log(messageInfo)
  })
})
