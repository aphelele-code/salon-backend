const express = require('express')
const { addProduct, getAllProducts, getSingleProduct, updateProduct, deleteProduct } = require('../controllers/inventoryController')
const router = express.Router()

router.post('/product', addProduct)
router.get('/', getAllProducts)
router.get('/:id', getSingleProduct)
router.patch('/:id', updateProduct)
router.delete('/:id', deleteProduct)


module.exports = router