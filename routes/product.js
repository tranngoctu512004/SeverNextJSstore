var express = require('express');
var router = express.Router();
const cache = require('memory-cache');
var ProductController = require('../modules/product/ProductController');
const { productsByCategoryCache, productDetailCache, allProductsCache } = require('../MiddleWaves/cache/ProductCache');
const { addProductValidator, productsByCategoryValidator, productDetailValidator, validate } = require('../MiddleWaves/validator/productValidators');
router.post('/addProduct', addProductValidator, validate, async (req, res) => {
    const { image, name, attribute, price, size, sizeUser, color, productDescription, parentCategory, subParentCategory } = req.body;
    try {
        const product = await ProductController.insert(image, name, attribute, price, size, sizeUser, color, productDescription, parentCategory, subParentCategory);
        res.status(200).json(product);
    } catch (error) {
        if (error.status) {
            res.status(error.status).json({ error: error.message });
        } else {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
});

router.post('/productsByCategory', productsByCategoryValidator, validate, productsByCategoryCache, async (req, res) => {
    const { id } = req.body;
    try {
        const products = await ProductController.getByParentCategory(id);
        cache.put(`productsByCategory_${id}`, products, 120 * 1000);
        res.status(200).json(products);
    } catch (error) {
        if (error.status) {
            res.status(error.status).json({ error: error.message });
        } else {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
});

router.post('/productsDetail', productDetailValidator, validate, productDetailCache, async (req, res) => {
    const { id } = req.body;
    try {
        const product = await ProductController.productDetail(id);
        cache.put(`productDetail_${id}`, product, 120 * 1000);
        res.status(200).json(product);
    } catch (error) {
        if (error.status) {
            res.status(error.status).json({ error: error.message });
        } else {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
});
router.post('/getAllProduct', allProductsCache, async (req, res) => {
    try {
        const allProducts = await ProductController.getAll();
        cache.put('allProducts', allProducts, 60 * 1000); 
        res.json(allProducts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
