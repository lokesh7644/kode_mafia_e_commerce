const express = require('express')
const app = express();

const cookieParser = require('cookie-parser')

// app.use(cookieParser());
app.use(cookieParser('youneedbettersecret'));


app.get('/', (req, res) => {
    console.log(req.cookies);
    // res.send(req.cookies); // All easy cookies
    res.send(req.signedCookies); // All signed cookies
})

// signed cookies
app.get('/getsignedcookies', (req, res) => {
    res.cookie('bindass', 'sachin', { signed: true })
    res.send('Cookie sent successfully')
})


// app.get('/setcookie', (req, res) => {
//     res.cookie('mode', 'dark')
//     res.cookie('location', 'delhi')
//     res.cookie('username', 'Samarth')
//     res.send('Server sent you cookie')
// })


// app.get('/getcookie', (req, res) => {
//     let { mode, location, username } = req.cookies;
//     res.send(`Hi my name is ${username}, I live in ${location} and my fav theme is ${mode}`)
// })


app.listen(8080, () => {
    console.log('Server connected at 8080');
});