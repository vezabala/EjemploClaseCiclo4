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

//Update un producto
exports.updateProduct= async (req,res,next) =>{
    let product = await producto.findById(req.params.id) //Variable tipo modificable
    if (!product){ //Verifico que el producto no exista para finalizar el proceso
        return res.status(404).json({
            sucess:false,
            message: 'No encontramos ese producto'
        })
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
}

//Eliminar un producto
exports.deleteProduct= async (req,res,next) =>{
    const product = await producto.findById(req.params.id) //Variable tipo modificable
    if (!product){ //Verifico que el producto no exista para finalizar el proceso
        return res.status(404).json({ //Si el objeto no existe, return termina el metodo
            sucess:false,
            message: 'No encontramos ese producto'
        })
    }

    await product.remove(); //Eliminmos el proceso
    res.status(200).json({
        sucess: true,
        message:"Producto eliminado correctamente"
    })
}