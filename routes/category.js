var express = require('express');
var router = express.Router();
var CategoryController = require('../modules/category/CategoryController')
var Categories = require('../modules/category/CategoryModule')
router.post('/addCate', async function (req, res) {
    const { cateID, cateName } = req.body;
    try {
        const category = await CategoryController.insert(cateID, cateName);
        res.status(200).json(category)
    } catch (error) {
        if (error.status) {
            res.status(error.status).json({ error: error.message });
        } else {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
});
router.post('/getAllCate', async function (req, res) {
    try {
        const AllCategory = await CategoryController.getAll();
        res.status(200).json(AllCategory)
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
router.post('/AllCategories', async (req, res) => {
    try {
        const categories = await Categories.aggregate([
            {
                $lookup: {
                    from: 'subcategories',
                    localField: '_id',
                    foreignField: 'parentCategory',
                    as: 'subCategories'
                }
            }
        ]);
        res.send(categories);
    } catch (error) {
        res.status(500).send(error);
    }
});
module.exports = router;