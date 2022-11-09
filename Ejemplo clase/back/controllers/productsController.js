const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const producto=require("../models/productos");
const ErrorHandler = require("../utils/errorHandler");
const fetch = (url) => import('node-fetch').then(({default:fetch}) => fetch(url)); //usurpación del require

//Ver lista de productos
exports.getProducts=catchAsyncErrors(async (req,res,next) =>{
    const productos = await producto.find();
    if (!productos){
        return next(new ErrorHandler("Informacion no encontrada", 404))
    }

    res.status(200).json({
        sucess:true,
        cantidad: productos.length,
        productos
    })
})

//Ver un producto por ID
exports.getProductsById= catchAsyncErrors( async(req,res,next) =>{
    const product = await producto.findById(req.params.id)
    if (!product){
        return next(new ErrorHandler("Producto no encontrado", 404))
    }
    res.status(200).json({
        sucess:true,
        message: "Aqui abajo encuenta informacion sobre el producto: ",
        product
    })
})

//Crear nuevo producto /api/productos
exports.newProduct=catchAsyncErrors(async(req,res,next)=>{
    const product= await producto.create(req.body);

    res.status(201).json({
        sucess:true,
        product
    })
})

//Update un producto
exports.updateProduct= catchAsyncErrors(async (req,res,next) =>{
    let product = await producto.findById(req.params.id) //Variable tipo modificable
    if (!product){
        return next(new ErrorHandler("Producto no encontrado", 404))
    }
    // Si el objeto si existe, entonces si ejecuto la actualizacion
    product= await producto.findByIdAndUpdate(req.params.id, req.body, {
        new: true, //solo tenga en cuenta lo nuevo
        runValidators: true //valide los datos nuevos
    });
    //Respondo OK si el producto si se actualizó
    res.status(200).json({
        sucess: true,
        message:"Producto actualizado correctamente",
        product
    })
})

//Eliminar un producto
exports.deleteProduct= catchAsyncErrors(async (req,res,next) =>{
    const product = await producto.findById(req.params.id) //Variable tipo modificable
    if (!product){
        return next(new ErrorHandler("Producto no encontrado", 404))
    }

    await product.remove(); //Eliminmos el proceso
    res.status(200).json({
        sucess: true,
        message:"Producto eliminado correctamente"
    })
})


//HABLEMOS DE FETCH
//Ver todos los productos
function verProductos(){
    fetch('http://localhost:4000/api/productos')
    .then(res => res.json())
    .then(res=>console.log(res))
    .catch(err=>console.error(err))
}

//verProductos(); LLamamos al metodo creado para probar la consulta

//Ver por id
function verProductoPorId(id){
    fetch('http://localhost:4000/api/producto/'+id)
    .then(res => res.json())
    .then(res=>console.log(res))
    .catch(err=>console.error(err))
}

//verProductoPorId('634d9be4fa6f87873472b313'); probamos el metodo con id