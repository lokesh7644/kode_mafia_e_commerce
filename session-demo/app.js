const express = require('express');
const session = require('express-session');
const app = express();


app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    // cookie: { secure: true }
}))

app.get('/', (req, res) => {
    res.send('Welcome to the session')
})

app.get('/viewcount', (req, res) => {
    if (req.session.count) {
        req.session.count += 1
    } else {
        req.session.count = 1;
    }
    res.send(`You visisted thr site ${req.session.count} times`)
})

app.get('/setname', (req, res) => {
    req.session.username = 'Samarth Vohra';
    res.redirect('/greet')
})

app.get('/greet', (req, res) => {
    let { username = 'anonymous' } = req.session;
    res.send(`Hi from ${username}`)
})

app.listen(8080, () => {
    console.log('Server connected at porn 8080');
})