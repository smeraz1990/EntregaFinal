import Product from "../models/product.model.js";
import ProductDTO from "../dto/product.dto.js"

const getAllProduct = async () => {
  const product = await Product.find().lean();
  const Categorias = await Product.distinct("category");
  let data=[]
  let productnew = []
  for (let i = 0; i < product.length; i++)
    {
      productnew.push({
        id: product[i]._id.toString(),
        name: product[i].name,
        price: product[i].price,
        thumbnail: product[i].thumbnail
      })
    }
    data=[{
      "Productos": productnew,
      "Categorias": Categorias
    }]

    //console.log("resultado service",data)
  return data;
};

const getProductByFilters = async (filters) => {
  const product = await Product.find(filters).lean();
  const Categorias = await Product.distinct("category");
  let data=[]
  let productnew = []
  for (let i = 0; i < product.length; i++)
    {
      productnew.push({
        id: product[i]._id.toString(),
        name: product[i].name,
        price: product[i].price,
        description: product[i].description,
        category: product[i].category,
        thumbnail: product[i].thumbnail
      })
    }
    data=[{
      "Productos": productnew,
      "Categorias": Categorias
    }]
    return data;
};

const createProduct = async (req,res) => {
  const {name,price,category,description} = req.body
  const thumbnail = req.file.filename
  const newProduct = {
      name,
      price,
      category,
      description,
      thumbnail
  }
  //console.log("producto a agregar",newProduct )
  const createdProduct = await Product.create(newProduct);

  //console.log(new ProductDTO(createdProduct))

  return new ProductDTO(createdProduct);
};

export default { getAllProduct,getProductByFilters, createProduct };
