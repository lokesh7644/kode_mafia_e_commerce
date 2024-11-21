const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const seedDB = require('./seed');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport')
const LocalStrategy = require('passport-local')
const User = require('./models/User')


const productRoutes = require('./routes/product');
const reviewRoutes = require('./routes/review');
const authRoutes = require('./routes/auth');
const cartRoutes = require('./routes/cart');
const productApi = require('./routes/api/productapi')


// mongoose.connect('mongodb://127.0.0.1:27017/shopping-sam-app')
mongoose.connect('mongodb+srv://lokeshverma764:UYyAM4aLdEt5R0bA@cluster0.98cx3.mongodb.net/shopping-loki-app')
    .then(() => {
        console.log("DB connceted successfully");
    })
    .catch((err) => {
        console.log("DB error");
        console.log(err);
    })

// Session
let configSession = {
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 24 * 7 * 60 * 1000,
        maxAge: 24 * 7 * 60 * 60 * 100
    }
}


app.engine('ejs', ejsMate)
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views')) // views folder
app.use(express.static(path.join(__dirname, 'public'))) // Public folder
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(session(configSession))
app.use(flash())
app.use(passport.initialize()); // For handling authentication
app.use(passport.session()); // Tells Passport to use sessions to persist authentication state between HTTP requests.

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success')
    res.locals.error = req.flash('error')
    next();
})

app.get("/", (req, res) => {
    res.render("home");
});

//PASSPORT 
passport.use(new LocalStrategy(User.authenticate()));

// seeding database
// seedDB();

app.use(productRoutes); // So that harr incoming request ke liye path check kiya jaae
app.use(reviewRoutes); // So that harr incoming request ke liye path check kiya jaae
app.use(authRoutes); // So that harr incoming request ke liye path check kiya jaae
app.use(cartRoutes); // So that harr incoming request ke liye path check kiya jaae
app.use(productApi); // So that harr incoming request ke liye path check kiya jaae


app.listen(8080, () => {
    console.log('Server is connected at PORT 8080');
})

