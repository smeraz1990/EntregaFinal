import Orden from "../models/orden.model.js";
import Carrito from "../models/carrito.model.js";
import OrdenDTO from "../dto/orden.dto.js"

const createOrden = async (ordenToCreate) => {
  const createdOrden= await Orden.create(ordenToCreate);
  const product = await Carrito.updateOne({ usuarioid: createdOrden.usuarioid},{ $set: { productos : [] }});

  return new OrdenDTO(createdOrden);
};

export default {createOrden};
