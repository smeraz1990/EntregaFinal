import productService from "../service/product.service.js";

const getAllProduct = async (req, res) => {
  try {
    const response = await productService.getAllProduct();
    res.render("product", {ProductosDB:response[0].Productos, Categorias:response[0].Categorias, usuariolog: req.user._id.toString()} );
  } catch (err) {
    if (err.statusCode) {
      logger.error(`Ruta ${method}${url}:  ${err}`);
    }

    res.sendStatus(500);
  }
};

const createProduct = async (req, res) => {
  try {
    //console.log("aqui el body",req.body )
    const response = await productService.createProduct(req.body);

    res.status(201).json(response);
  } catch (err) {
    console.log(err);
    if (err.statusCode) {
      return res.status(statusCode).send(err);
    }

    res.sendStatus(500);
  }
};

const getProductByFilters = async (req, res) => {
  try {
    const {id,categoria} = req.params
    let filters
    if (typeof id !== 'undefined') {
      filters = { _id: id };
    }
    else
    {
      filters = { category: categoria };
    }   
    const response = await productService.getProductByFilters(filters);

    if (response.length == 0)
    {
      res.json({error: "Este producto no existe"})
    }
    else{
      if (typeof id !== 'undefined') {
        //console.log("datos detalle",response[0])
        res.render("productDetails", {ProductosDB:response[0].Productos[0],usuariolog: req.user._id.toString()} );
      }
      else
      {
        res.render("product", {ProductosDB:response[0].Productos, Categorias:response[0].Categorias,usuariolog: req.user._id.toString()} );
      }
    }
    
    //res.json(response);
  } catch (err) {
    if (err.statusCode) {
      return res.status(statusCode).send(err);
    }

    res.sendStatus(500);
  }
};

export default { getAllProduct, createProduct, getProductByFilters };
