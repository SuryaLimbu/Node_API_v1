// importing the "express" module 
const express = require('express');

const mongoose = require('mongoose')
const Product = require('./models/productModel');
// assogn the 'express' variable to  app variable
const app = express();


app.use(express.json());

// Routes
// request= client send to node APP
// response =  node APP send to client
app.get('/', (req, res) => {
    res.send('Hello API');
})
app.get('/blog', (req, res) => {
    res.send('hello blog my name is surya');
})


app.post('/products', async (req, res) => {
    try {
        const products = await Product.create(req.body)
        res.status(200).json(products);

    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: error.message })
    }
})

app.get('/products', async (req, res) => {
    try {

        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: error.message })
    }
})

app.get('/product/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: error.message })
    }
})

app.put('/product/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        if (!product) {
            return res.status(404).json({ message: `cannot find any product with id ${id}` })

        }
        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: error.message })
    }
})

app.delete('/product/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).json({ message: `cannot find any product with id ${id}` })
        }
        res.status(200).json(product);
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: error.message })
    }

})




mongoose.connect('mongodb+srv://admin:admin@kedem.hljyoxk.mongodb.net/Node-API?retryWrites=true&w=majority')
    .then(() => {
        console.log('connected to mongodb');
        // this app satrt server  and listen on port 3000 for connection 
        app.listen(3000, () => {
            console.log(`Node api is running on port 3000`)
        });
    }).catch((error) => {
        console.log(error);
    })