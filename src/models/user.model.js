import { Schema, model } from "mongoose";

const userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  nombre: { type: String, required: false },
  direccion: { type: String, required: false },
  edad: { type: String, required: false },
  telefono: { type: String, required: false },
  avatar: { type: String, required: false },
});

export default model("user", userSchema);
