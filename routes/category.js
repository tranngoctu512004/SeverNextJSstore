const express = require('express');
const router = express.Router();
const cache = require('memory-cache');
const CategoryController = require('../modules/category/CategoryController');
const { addCategoryValidator, validate } = require('../MiddleWaves/validator/cateValidators');
const Categories = require('../modules/category/CategoryModule');
const cacheMiddleware = require('../MiddleWaves/cache/CateCache');

router.post('/addCate', addCategoryValidator, validate, async (req, res) => {
    const { cateID, cateName } = req.body;
    try {
        const category = await CategoryController.insert(cateID, cateName);
        res.status(200).json(category);
    } catch (error) {
        if (error.status) {
            res.status(error.status).json({ error: error.message });
        } else {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
});

router.post('/getAllCate', async (req, res) => {
    try {
        const AllCategory = await CategoryController.getAll();
        res.status(200).json(AllCategory);
    } catch (error) {
        if (error.status) {
            res.status(error.status).json({ error: error.message });
        } else {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
});

router.post('/AllCategories', cacheMiddleware, async (req, res) => {
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
        cache.put('AllCategories', categories, 60 * 1000);
        res.send(categories);

    } catch (error) {
        if (error.status) {
            res.status(error.status).json({ error: error.message });
        } else {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
});
router.post('/getCateByID', async (req, res) => {
    const { id } = req.body;
    try {
        const cate = await CategoryController.getByCateID(id);
        res.status(200).json(cate);
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
