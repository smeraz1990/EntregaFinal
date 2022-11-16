import MensajeDTO from "../dto/mensjae.dto.js"
import Mensaje from "../models/mensaje.model.js";
const createMensaje = async (req,res) => {
  const mensajeCreado = await Mensaje.create(req);
  return mensajeCreado
};

const ReadMensajes = async (req,res) => {
  const mensajeResponse = await Mensaje.find();
  let mensajenew = []
  let clase = 1
  for (let i = 0; i < mensajeResponse.length; i++)
    {
      if (mensajeResponse[i].username != 'saymon@gk.com')
      {
        clase = 1
      }
      mensajenew.push({
        id: mensajeResponse[i]._id.toString(),
        username: mensajeResponse[i].username,
        txtmensje: mensajeResponse[i].txtmensje,
        horaenvio: mensajeResponse[i].horaenvio,
        avatar: mensajeResponse[i].avatar,
        claseMensaje: clase
      })
    }
  //console.log("repuesta mensajes",mensajeResponse)
  return mensajenew
};
export default { createMensaje,ReadMensajes };
