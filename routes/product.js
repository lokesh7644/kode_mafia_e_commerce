const express = require('express');
const Product = require('../models/Product');
const Review = require('../models/Review');
const router = express.Router() // mini instance
const { validateProduct, isLoggedIn, isSeller, isProductAuthor } = require('../middleware')
const {showAllProducts, productForm, createProduct, showProduct, editProductFrom, updateProduct, deleteProduct} = require('../controller/product')

// To show all the products
router.get('/products', showAllProducts)

// To show the form for new product
router.get('/product/new', isLoggedIn, productForm)

// To actually add the product
router.post('/products', validateProduct, isLoggedIn, isSeller, createProduct)

// To show a particular product
router.get('/products/:id', isLoggedIn, showProduct)

// Form to edit the product
router.get('/products/:id/edit', isLoggedIn, editProductFrom)

// To actually edit the data in DB
router.patch('/products/:id', isLoggedIn, updateProduct)

// To delete a product
router.delete('/products/:id', isLoggedIn, isProductAuthor, deleteProduct)


module.exports = router;