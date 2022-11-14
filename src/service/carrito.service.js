import Carrito from "../models/carrito.model.js";
import CarritoDTO from "../dto/carrito.dto.js"

const getCarritoByFilters = async (filters) => {
  const product = await Carrito.find(filters).lean();

  return product
};

const getCarritoProductByFilters = async (filters) => {
  const product = await Carrito.find(filters);

  return product[0].productos;
};

const UpdateCarritoProductByFilters = async (filters) => {
  const usuarioid = filters.idusuario
  const productos = filters.productos
  const product = await Carrito.updateOne({ usuarioid},{ $set: { productos : productos }});

  return product;
};

const createCarrito = async (carritoToCreate) => {
  const createdCarrito = await Carrito.create(carritoToCreate);

  //console.log(new CarritoDTO(createdCarrito))

  return new CarritoDTO(createdCarrito);
};

export default { getCarritoByFilters, getCarritoProductByFilters, UpdateCarritoProductByFilters,createCarrito};
