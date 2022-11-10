import { Schema, model } from "mongoose";

const ordenSchema = new Schema({
  usuarioid: { type: String, required: true },
  productos: { type: Array, required: true },
  fechaCreacion: { type : Date, default: Date.now },
  status: { type: String, required: true,default: 'generada' }
});

export default model("orden", ordenSchema);
