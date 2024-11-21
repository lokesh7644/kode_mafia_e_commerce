const mongoose = require("mongoose");
const Review = require("./Review");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    img: {
        type: String,
        trim: true
    },
    price: {
        type: Number,
        min: 0,
        required: true
    },
    desc: {
        type: String,
        trim: true
    },
    avgRating: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Review'
        }
    ],
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

// Middleware jo behind the scene mongodb operation krvane me use hota hai and 
// iske andr pre and post middleware hote hai which are basically used over 
// the schema and before the model is js class.

productSchema.post('findOneAndDelete', async function (product) {
    if (product.reviews.length > 0) {
        await Review.deleteMany({ _id: { $in: product.reviews } })
    }
})

// Ye jo Review.findByIdAndDelete and update jo mongodb operation jo hm moongose ke
// jreye estemal kr re h. Background me ye moongose middleware ka use krte h
// to hm yha us middleware me thoda edit krke usme reviews delete la logic add kr re h
// findByIdAndDelete background me vo findOneAndDelete operation hit krta h
// TO hm use operation ko edit kr re taki reviews bhi delete ho jae
// Jo app.js file me middle ware use kr re the vo middleware express ke the
// But yha jis middle ware ki bat chl re h vo moongose ka middle ware h


let Product = mongoose.model('Product', productSchema);
module.exports = Product;