import { Schema, model } from "mongoose";

const mensajeSchema = new Schema({
  username: { type: String, required: true },
  nombre: { type: String, required: true },
  txtmensje: { type: String, required: true },
  horaenvio: { type: String, required: false },
  avatar: { type: String, required: false },
});

export default model("mensajes", mensajeSchema);
