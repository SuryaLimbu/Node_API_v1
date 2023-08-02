
const Product = require('../models/productModel');
const asyncHandler = require('express-async-handler')

const mongoose = require('mongoose');

// get products
const getProducts = asyncHandler(async (req, res) => {
    try {

        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500);
        throw new Error(error.message);

        // console.log(error.message)
        // res.status(500).json({ message: error.message })

    }
})

// post products
const postProducts = asyncHandler(async (req, res) => {
    try {
        const products = await Product.create(req.body)
        res.status(200).json(products);

    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: error.message })
    }
})

// get sigle product
const getSigleProduct = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;

        // Check if the id is a valid ObjectId
        if (!mongoose.isValidObjectId(id)) {
            res.status(400);
            throw new Error(`Invalid product ID: ${id}`);
        }

        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (error) {
        res.status(404);
        throw new Error(`cannot find any product with ID ${id}`);
    }
})


// update product
const updateProduct = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        // Check if the id is a valid ObjectId
        if (!mongoose.isValidObjectId(id)) {
            res.status(400);
            throw new Error(`Invalid product ID: ${id}`);
        }
        const product = await Product.findByIdAndUpdate(id, req.body);
        if (!product) {
            res.status(404);
            throw new Error(`cannot find any product with ID ${id}`);

        }
        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: error.message })
    }
})



// delete product 
const deleteProduct = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        // Check if the id is a valid ObjectId
        if (!mongoose.isValidObjectId(id)) {
            res.status(400);
            throw new Error(`Invalid product ID: ${id}`);
        }
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            res.status(404);
            throw new Error(`cannot find any product with ID ${id}`);
        }
        res.status(200).json(product);

    } catch (error) {
        // res.status(500);
        console.log(error);
        // throw new Error(error.message);
        throw error;
    }
})




module.exports = {
    getProducts,
    postProducts,
    getSigleProduct,
    updateProduct,
    deleteProduct,
    
}