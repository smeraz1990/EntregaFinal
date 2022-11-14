import carritoService from "../service/carrito.service.js";
import productosService from "../service/product.service.js";

const getCarrito = async (req, res) => {
  try {
    const { idusuario } = req.params
    const filters = { usuarioid: idusuario };
    const response = await carritoService.getCarritoProductByFilters(filters);
    let SumaCarrito = 0
    //console.log(response)
    for(let i=0; i < response.length; i++)
    {
      SumaCarrito += response[i].qry * response[i].price
    }
    //console.log(SumaCarrito)
    //res.json({ProductosDB:response,SumaCarrito});
    res.render("carrito", {ProductosDB:response,SumaCarrito, usuariolog: idusuario} );
    //res.json({ProductosDB:response,SumaCarrito});

  } catch (err) {
    if (err.statusCode) {
      return res.status(statusCode).send(err);
    }

    res.sendStatus(500);
  }
};

const createCarrito = async (req, res) => {
  try {
    //console.log("aqui el body",req )
    const response = await carritoService.createCarrito(req);

    return response
  } catch (err) {
    console.log(err);
    if (err.statusCode) {
      return res.status(statusCode).send(err);
    }

    res.sendStatus(500);
  }
};

const getOneProductCarrito = async (req, res) => {
try {
  //console.log("parametros",req.params)
  //const usuarioid = req.user._id.toString()
  const { idusuario,idproduct } = req.params
  let filters = { usuarioid: idusuario };
  //console.log(filters)
  const response = await carritoService.getCarritoByFilters(filters);
  const arrayProductos = response[0].productos?.filter(producto => {
      return producto.productoid === idproduct
  })

  if(arrayProductos.length == 0)
    {
      filters = { _id: idproduct }
        const productonew = await productosService.getProductByFilters(filters)          
        response[0].productos.push({
          productoid: productonew[0].Productos[0].id,
          thumbnail: productonew[0].Productos[0].thumbnail,
          name: productonew[0].Productos[0].name,
          price: productonew[0].Productos[0].price,
          qry: 1
        })  
    }
    else{
        const indexDatos = response[0].productos.findIndex(object => {
            return object.productoid === idproduct;
        });
        response[0].productos[indexDatos].qry = response[0].productos[indexDatos].qry + 1
    }
    //console.log("arreglo de productos:",response[0].productos)
    const UpdateProductosCarrito = await carritoService.UpdateCarritoProductByFilters({idusuario,productos : response[0].productos})
    let ContadorProductos = 0
    for(let i=0; i < response[0].productos.length; i++)
    {
      ContadorProductos += response[0].productos[i].qry
    }
    res.json({numeroProductos: ContadorProductos});
  } catch (err) {
    if (err.statusCode) {
      return res.status(statusCode).send(err);
    }
    res.sendStatus(500);
  }
};

const deleteProductCarrito = async (req, res) => {
  try {
    const { idusuario,idproduct } = req.params
    let filters = { usuarioid: idusuario };
    const response = await carritoService.getCarritoByFilters(filters);
    const indexDatos = response[0].productos.findIndex(object => {
      return object.productoid === idproduct;
    });
    response[0].productos.splice(indexDatos,1)
    const UpdateProductosCarrito = await carritoService.UpdateCarritoProductByFilters({idusuario,productos : response[0].productos})
    let ContadorProductos = 0
    for(let i=0; i < response[0].productos.length; i++)
    {
      ContadorProductos += response[0].productos[i].qry
    }
    res.json({numeroProductos: ContadorProductos});


  } catch (err) {
    console.log(err);
    if (err.statusCode) {
      return res.status(statusCode).send(err);
    }

    res.sendStatus(500);
  }
};



export default { getCarrito, createCarrito, getOneProductCarrito,deleteProductCarrito};
