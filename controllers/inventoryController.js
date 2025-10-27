const { default : mongoose, Mongoose} = require('mongoose')
const Inventory = require('../models/inventoryModel.js')

//add a product
const addProduct = async(req, res) => {
const {product_name, purchase_price, product_category, retail_price, quantity_in_stock, unit_of_measure, reorder_level, supplier, barcode
} = req.body

try {
    const inventory = await Inventory.create({product_name, purchase_price, product_category, retail_price, quantity_in_stock, unit_of_measure, reorder_level, supplier, barcode})
    res.status(200).json(inventory)
} catch (error) {
    res.status(400).json(error)
}
}

// get all products
const getAllProducts = async(req, res) => {
    try {
       const inventory = await Inventory.find({}) 
       res.status(200).json(inventory)
    } catch (error) {
        res.status(404).json(error)
    }

}

// get a single product
const getSingleProduct = async(req, res) => {
    const {id} = req.params
    try {
         const inventory = await Inventory.findById(id)
        if(!mongoose.Types.ObjectId.isValid(id)){
            res.status(404).json({error : "Product not found"})
        }
        if(!inventory){
              res.status(404).json({error : "Product not found"})
        }
       else{
        res.status(200).json(inventory)
       }
    } catch (error) {
        res.status(400).json(error)
    }
}
// get type of products

// update a product
const updateProduct = async(req, res) => {
const {id} = req.params
try {
    const inventory = await Inventory.findByIdAndUpdate({_id : id}, {...req.body})
    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).json({error : "Product not found"})
    }
    if(!inventory){
        res.status(404).json({error: "Product not found"})
    }
    else{
        res.status(200).json(inventory)
    }
} catch (error) {
    res.status(400).json(error)
    console.log(error)
}
}
// delete a product
const deleteProduct = async(req, res) => {
    const {id} = req.params
    try {
        const inventory = await Inventory.findByIdAndDelete({_id : id})
        if(!mongoose.Types.ObjectId.isValid(id)){
            res.status(404).json({error: "Product not found"})
        }
        if(!inventory) {
           res.status(404).json({error: "Product not found"}) 
        }
    } catch (error) {
        res.status(400).json(error)
    }

}
module.exports = {
    addProduct,
    getAllProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct
}
