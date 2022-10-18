const producto = require("../models/productos")

//Ver lista de productos
exports.getProducts=async(req,res,next) =>{
    const productos = await producto.find();
    res.status(200).json({
        sucess:true,
        cantidad: productos.length,
        productos
    })
}

//Ver un producto por ID
exports.getProductsById= async(req,res,next) =>{
    const product = await producto.findById(req.params.id)
    if (!product){
        return res.status(404).json({
            sucess:false,
            message: 'No encontramos ese producto'
        })
    }
    res.status(200).json({
        sucess:true,
        message: "Aqui abajo encuenta informacion sobre el producto: ",
        product
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

