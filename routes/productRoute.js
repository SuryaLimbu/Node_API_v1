const express = require('express');

const { getProducts, postProducts, getSigleProduct, updateProduct, deleteProduct } = require('../controller/productController');
const router = express.Router();


router.post('/', postProducts);

router.get('/', getProducts);

router.get('/:id', getSigleProduct);

router.put('/:id', updateProduct);

router.delete('/:id', deleteProduct);




module.exports = router;