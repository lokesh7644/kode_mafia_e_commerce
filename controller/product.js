const Product = require('../models/Product')

const showAllProducts = async (req, res) => {
    try {
        let products = await Product.find({});
        res.render('products/index', { products })
    }

    catch (e) {
        res.status(500).render(`error`, { err: e.message })
    }
}

const productForm = (req, res) => {
    try {
        res.render('products/new')
    }

    catch (e) {
        res.status(500).render(`error`, { err: e.message })
    }
}

const createProduct = async (req, res) => {
    try {
        let { name, img, price, desc } = req.body;
        await Product.create({ name, img, price, desc, author: req.user._id })
        req.flash('success', 'Product added successfully')
        res.redirect('/products')
    }

    catch (e) {
        res.status(500).render(`error`, { err: e.message })
    }
}

const showProduct = async (req, res) => {
    try {
        let { id } = req.params;
        let foundProduct = await Product.findById(id).populate('reviews');
        res.render('products/show', { foundProduct, msg: req.flash('msg') })
    }

    catch (e) {
        res.status(500).render(`error`, { err: e.message })
    }
}

const editProductFrom = async (req, res) => {
    try {
        let { id } = req.params;
        let foundProduct = await Product.findById(id);
        res.render('products/edit', { foundProduct })
    }

    catch (e) {
        res.status(500).render(`error`, { err: e.message })
    }
}

const updateProduct = async (req, res) => {
    try {
        let { id } = req.params;
        let { name, img, price, desc } = req.body;
        await Product.findByIdAndUpdate(id, { name, img, price, desc });
        req.flash('success', 'Product edited successfully')
        res.redirect(`/products/${id}`);
    }

    catch (e) {
        res.status(500).render(`error`, { err: e.message })
    }
}

const deleteProduct = async (req, res) => {
    try {
        let { id } = req.params;
        // Here is the logic for delete the reviews when a particular product is deleted
        // But we dont use that logic bcz it is not industry standard. Instead of that
        // We use moongose middleware
        const product = await Product.findById(id);
        // for (let id of product.reviews) {
        //     await Review.findByIdAndDelete(id)
        // } 
        await Product.findByIdAndDelete(id);
        req.flash('success', 'Product deleted successfully')
        res.redirect('/products');
    }

    catch (e) {
        res.status(500).render(`error`, { err: e.message })
    }
}

module.exports = {showAllProducts, productForm, createProduct, showProduct, editProductFrom, updateProduct, deleteProduct}