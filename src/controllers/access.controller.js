import usuarioService from '../service/user.service.js'
import path from 'path';
import {fileURLToPath} from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const Login = async(req, res)=>{
    const {url , method} = req
    try{
        {
            const {username} = req
            const response = await usuarioService.getUserbyName({username})
            //console.log("datos usuario login",response)
            return response
          }
    }
    catch(err){
      res.sendStatus(500);
    }
}
const getLogin = async (req, res) => {
    if (req.isAuthenticated()) {
      var user = req.user;
      //console.log("user logueado");
      //console.log("datos login",user._id.toString())
      res.render("login-ok", {
        usuario: user.username
      });
    } else {
      //console.log("user NO logueado");
      res.sendFile(path.join(__dirname,"../../views/login.html"));
    }
  }

  const getRegister = async(req, res)=>{
    const {url , method} = req
    try{
        { 
          res.sendFile(path.join(__dirname,"../../views/register.html"));
        }
    }
    catch(err){
        logger.error(`Ruta ${method}${url}:  ${err}`);
    }
}


const postLogin = async (req, res) => {
    let user = req.user;
    res.sendFile(path.join(__dirname,"../views/index.html"));
}
export default {
    Login,
    getLogin,
    postLogin,
    getRegister
    
}