import Product from "../models/product.model.js";
import ProductDTO from "../dto/product.dto.js"

const getAllProduct = async () => {
  const product = await Product.find().lean();
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
  return productnew;
};

const getProductByFilters = async (filters) => {
  const product = await Product.find(filters);
  return product;
};

const createProduct = async (productToCreate) => {
  const createdProduct = await Product.create(productToCreate);

  //console.log(new ProductDTO(createdProduct))

  return new ProductDTO(createdProduct);
};

export default { getAllProduct,getProductByFilters, createProduct };
