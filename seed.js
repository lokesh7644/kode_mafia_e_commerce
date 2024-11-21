const mongoose = require('mongoose');
const Product = require('./models/Product')

const products = [
    {
        name: `Iphone 14pro`,
        img: `https://images.unsplash.com/photo-1705305835960-3271b7e9ae9c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8SXBob25lJTIwMTQlMjBwcm98ZW58MHx8MHx8fDA%3D`,
        price: 130000,
        desc: `Very Costly, Okat se bhar`
    },
    {
        name: `Mackbook M2`,
        img: `https://images.unsplash.com/photo-1617472241266-ff84f4ea167a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fE1hY2tib29rfGVufDB8fDB8fHww`,
        price: 250000,
        desc: `Ye to bilkul, Okat se bhar`
    },
    {
        name: `Iwatch`,
        img: `https://images.unsplash.com/photo-1517420879524-86d64ac2f339?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aXdhdGNofGVufDB8fDB8fHww`,
        price: 51000,
        desc: `Ye sasta h lelo`
    },
    {
        name: `Ipad pro`,
        img: `https://images.unsplash.com/photo-1557825835-70d97c4aa567?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aXBhZHxlbnwwfHwwfHx8MA%3D%3D`,
        price: 23790,
        desc: `Life me kuch chej sirf dikhane ke liye hote h`
    },
    {
        name: `Airpods`,
        img: `https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGFpcnBvZHN8ZW58MHx8MHx8fDA%3D`,
        price: 25000,
        desc: `Bdiya h kmao kmao`
    }
]

async function seedDB() {
    await Product.insertMany(products)
    console.log(`Data seeded successfully`);
}

module.exports = seedDB;    