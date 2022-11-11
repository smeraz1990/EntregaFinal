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
import datosLogin from './components/LoginStategy.js'
import passport from 'passport';

const app = express();

app.use(json());
app.use(session({
  secret: 'coderhouse',
  resave: false,
  saveUninitialized: false,
  rolling: true,
  cookie:{
      httpOnly:false,
      secure: false,
      maxAge: config.tiemposession,
  }
}))
app.use(passport.initialize());
app.use(passport.session());
passport.use('register',datosLogin.registerStrategy)
passport.use('login',datosLogin.loginStrategy)
passport.serializeUser((user,done)=>{
    done(null,user._id)
})

passport.deserializeUser((id,done)=>{
    datosLogin.User.findById(id,done)
})
app.use(express.static(path.join(__dirname, '../views')))
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
  res.sendStatus(404);
});




mongoose.connect(config.dbUrl).then(() => {
  console.log("Database connected!");
  app.listen(config.port, () => {
    console.log(`Server listening host http://localhost:${config.port}`);
  });
});
