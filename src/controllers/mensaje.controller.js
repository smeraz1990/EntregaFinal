import mensajeService from "../service/mensaje.service.js";
import checkAuthentication from '../components/CheckAuth.js'

const createMensaje = async (req, res) => {
  try {
    const createdMensaje = await mensajeService.createMensaje(req);

    return createdMensaje
  } catch (err) {
    console.log(err);
    if (err.statusCode) {
      return res.status(err.statusCode).send(err);
    }

    return err
  }
};

const ReadMensajes = async (req, res) => {
  try {
    const readdMensaje = await mensajeService.ReadMensajes();

    return readdMensaje
  } catch (err) {
    console.log(err);
    if (err.statusCode) {
      return res.status(err.statusCode).send(err);
    }

    return err
  }
};
export default { createMensaje,ReadMensajes };
