import { Schema, model } from "mongoose";

const carritoSchema = new Schema({
  usuarioid: { type: String, required: true },
  productos: { type: Array, required: true },
});

export default model("carrito", carritoSchema);
