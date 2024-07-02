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
router.post('/productsByCategory', async function (req, res) {
    const { id } = req.body;
    try {
        const products = await ProductController.getByParentCategory(id);
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
router.post('/productsDetail', async function (req, res) {
    const { id } = req.body;
    try {
        const products = await ProductController.productDetail(id);
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
router.post('/getAllProduct', async function (req, res) {
    try {
        const AllProduct = await ProductController.getAll();
        res.status(200).json(AllProduct)
    } catch (error) {
        if (error.status) {
            res.status(error.status).json({ error: error.message });
        } else {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}
)

module.exports = router;
