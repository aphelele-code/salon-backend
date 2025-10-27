const mongoose = require('mongoose')
const Schema = mongoose.Schema

const inventorySchema = new Schema ({
    product_name:{
        type: String,
        required: true,
        trim: true
    },
     purchase_price:{
        type: Number,
        required: true
    },
     product_category:{
        type: String,
        required: true,
        enum : ["Consumable", "Retail", "Equipment"]
    },
    retail_price : {
        type: Number,
        required: false
    },
    quantity_in_stock : {
        type: Number, 
        required: true,
        default: 0,
        min: 0
    },
    unit_of_measure: {
        type: String,
        required: true,
      enum: ["ml", "g", "pieces", "bottles", "tubes", "L"]
    },
    reorder_level: {
type: Number,
required: true,
default: 5
    },
   supplier: {
    type: String,
    required: false
   },
   barcode: {
    type: String,
    required: true,
    unique: true
   }
 
}, {timestamps: true})

module.exports = mongoose.model('Inventory', inventorySchema)