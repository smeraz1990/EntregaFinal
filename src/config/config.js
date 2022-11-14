import dotenv from "dotenv";
dotenv.config();

export default {
  port: process.env.PORT || 3000,
  dbUrl: process.env.DB_URL,
  tiemposession: Number(process.env.TIEMPO_EXPIRACION),
  apisecret: process.env.API_SECRET
};
