var express = require('express');
var router = express.Router();
var ProductController = require('../modules/product/ProductController')

router.post('/addProduct', async function (req, res) {
    const { image, name, attribute, price, size, sizeUser, color, productDescription, parentCategory, subParentCategory } = req.body;
    try {
        const product = await ProductController.insert(image, name, attribute, price, size, sizeUser, color, productDescription, parentCategory, subParentCategory);
        res.status(200).json(product)
    } catch (error) {
        if (error.status) {
            res.status(error.status).json({ error: error.message });
        } else {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

})
module.exports = router;
