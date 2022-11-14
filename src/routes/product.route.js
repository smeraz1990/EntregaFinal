import { Router } from "express";
import productController from "../controllers/product.controller.js";
import checkAuthentication from '../components/CheckAuth.js'

const router = Router();
const idRouter = Router({mergeParams: true});
const categoriaRouter = Router({mergeParams: true});


// you can nest routers by attaching them as middleware:
router.use('/categoria/:categoria', categoriaRouter);
router.use('/:id', idRouter);

router
  .route("/")
  .get(checkAuthentication,productController.getAllProduct)
  .post(checkAuthentication, productController.createProduct);
idRouter.route("/").get( productController.getProductByFilters);
categoriaRouter.route("/").get( productController.getProductByFilters);

export default router;
