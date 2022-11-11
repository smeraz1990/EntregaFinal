import {Strategy as LocalStrategy}  from 'passport-local'
import logger from './winstonconfig.js';
import userController from '../controllers/user.controller.js'
import carritoController from '../controllers/carrito.controller.js'
import loginControllers from '../controllers/access.controller.js'
import bcrypt from 'bcrypt'
import User from '../models/user.model.js'

function hashPassword(password){
    return bcrypt.hashSync(password,bcrypt.genSaltSync(10))
}

function isvalidpassword(reqPassword,dbPassword){
    return bcrypt.compareSync(reqPassword,dbPassword)
}

const registerStrategy = new LocalStrategy({passReqToCallback:true},
async (req,username,password,done)=>{
    //console.log("dato 1", username)
    //console.log("muestra datos", req.body)
const{nombre,direccion,edad,telefono} = req.body
    const {url , method, file} = req
    try{
        const existingUser = await userController.getUserbyName({username})
        console.log(existingUser)
        if(existingUser)
        {
            return done(null,null)   
        }
        const newUser = {
            username,
            password: hashPassword(password),
            nombre,
            direccion,
            edad,
            telefono,
            avatar: `${file.filename}`
        }

        //console.log("dato existente", newUser)

        const createdUser = await userController.CreateUser(newUser)
        const newCarrito = {
            usuarioid: createdUser._id.toString(),
            productos: [],
        }
        const createCarrito = await carritoController.createCarrito(newCarrito)
        done(null,createdUser)
    } catch(error){
        logger.error(` Ruta ${method}${url} error al registrar usuario`)
        done(null,null)
    }
})

const loginStrategy = new LocalStrategy(async (username,password,done)=>{
    try{
        const user = await loginControllers.Login({username})
        //console.log("respuesta", username,password)
        

        if(!user || !isvalidpassword(password,user.password)){
            return done(null)
        }

        done(null,user)

    }catch(error)
    {
        logger.error('server.js error login')
        done('Error login',null)
    }

})

export default {
    registerStrategy,
    loginStrategy,
    logger,
    User
}
    