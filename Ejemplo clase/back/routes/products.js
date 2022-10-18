const express=require("express")
const router= express.Router();

const{getProducts, newProduct, getProductsById, updateProduct, deleteProduct} = require("../controllers/productsController") //traemos la respuesta json desde el controlador

router.route('/productos').get(getProducts) //Establecemos desde que ruta queremos ver getproducts
router.route('/producto/nuevo').post(newProduct); //Establecemos la ruta
router.route('/producto/:id').get(getProductsById); //Ruta para alcanzar con id
router.route('/producto/:id').put(updateProduct); //Creacion de la ruta de actualizacion
router.route('/producto/:id').delete(deleteProduct); //Creacion de la ruta de eliminacion por id

module.exports=router;