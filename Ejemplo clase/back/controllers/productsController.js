const producto = require("../models/productos")

//Ver lista de productos
exports.getProducts=(req,res,next) =>{
    res.status(200).json({
        sucess:true,
        message: "En esta ruta usted va a poder ver todos los productos"
    })
}

//Crear nuevo producto /api/productos
exports.newProduct= async(req,res,next) =>{
    const product= await producto.create(req.body);

    res.status(201).json({
        sucess:true,
        product
    })
}