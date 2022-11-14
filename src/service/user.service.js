import UserDTO from "../dto/user.dto.js";
import User from "../models/user.model.js";
import CustomError from "../utils/CustimError.js";
import bcrypt from "bcrypt";
import jwt from "../utils/jwt.js";
import { json } from "express";

const hashPassword = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

const isValidPassword = (plainPassword, hashedPassword) => {
  return bcrypt.compareSync(hashedPassword, plainPassword);
};

const getUserOneByFilter = async (filters) => {
  const user = await User.findOne(filters);
  if(user !== null){
    return new UserDTO(user);
  }
  return user
};

const createUser = async (req,res) => {
  const filters = req.username ; 
  const existingUser = await User.findOne({username:filters});



  if (existingUser) {
    return JSON.stringify(new CustomError(false, "Email already in use", true, 400));
    //throw new CustomError(false, "Email already in use", true, 400);
  }


  const createdUser = await User.create({
    password: req.password,
    username: req.username,
    nombre: req.nombre,
    direccion: req.direccion,
    avatar: req.avatar
  }); 

  return JSON.stringify(new UserDTO(createdUser));
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
