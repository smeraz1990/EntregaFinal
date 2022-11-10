import UserDTO from "../dto/user.dto.js";
import User from "../models/user.model.js";
import CustomError from "../utils/CustimError.js";
import bcrypt from "bcrypt";
import jwt from "../utils/jwt.js";

const hashPassword = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

const isValidPassword = (plainPassword, hashedPassword) => {
  return bcrypt.compareSync(hashedPassword, plainPassword);
};

const getUserOneByFilter = async (filters) => {
  const user = User.findOne(filters);

  return new UserDTO(user);
};

const createUser = async (req,res) => {
  //console.log("aqui los filtros",filters2)
  const filters = req.username ;

  const existingUser = await User.findOne({username:filters});



  if (existingUser) {
    throw new CustomError(false, "Email already in use", true, 400);
  }

  const hashedPassword = hashPassword(req.password);



  const createdUser = await User.create({
    password: hashedPassword,
    username: req.username,
    nombre: req.nombre,
    direccion: req.direccion,
    edad: req.edad,
    telefono: req.telefono,
    avatar: req.avatar
  }); 

  return new UserDTO(createdUser);
};

const login = async ({ username, password }) => {
  const filters = { username };
  const user = await User.findOne(filters);

  if (!user || isValidPassword(password, user.password)) {
    throw "Error";
  }

  const authToken = jwt.generateToken(user);

  return authToken;
};

export default { getUserOneByFilter, createUser, login };
