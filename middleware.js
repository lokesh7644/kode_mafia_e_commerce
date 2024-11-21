const { productSchema, reviewSchema } = require('./schema')
const Product = require('./models/Product')

const validateProduct = (req, res, next) => {
    let { name, img, price, desc } = req.body;
    const { error } = productSchema.validate({ name, img, price, desc })
    if (error) {
        return res.render(`error`);
    }
    next();
}

const validateReview = (req, res, next) => {
    const { rating, comment } = req.body;
    const { error } = reviewSchema.validate({ rating, comment });
    if (error) {
        return res.render(`error`);
    }
    next();
}

const isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.flash('error', 'Please login first');
        return res.redirect('/login');
    }
    next();
}


const isSeller = (req, res, next) => {
    if (!req.user.role) {
        req.flash('error', 'You dont have the permission to do that');
        return res.redirect('/products')
    } else if (req.user.role !== 'seller') {
        req.flash('error', 'You dont have the permission to do that');
        return res.redirect('/products')
    }
    next();
}

const isProductAuthor = async (req, res, next) => {
    let { id } = req.params; // Product
    let product = await Product.findById(id); // Entire product
    if (!product.author.equals(req.user._id)) {
        req.flash('error', 'You are not the authorised user');
        return res.redirect('/products')
    }
    next();
}

module.exports = { isLoggedIn, validateProduct, validateReview, isSeller, isProductAuthor }