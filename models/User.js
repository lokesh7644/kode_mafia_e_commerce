const mongoose = require('mongoose');
const passportLocalMoongose = require('passport-local-mongoose');

let userSchema = new mongoose.Schema({
    email: {
        type: String,
        trim: true,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    cart: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }
    ],
    wishlist: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }
    ]
})


userSchema.plugin(passportLocalMoongose);


let User = mongoose.model(`User`, userSchema);
module.exports = User;