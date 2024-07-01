var express = require('express');
var router = express.Router();
var SubCategoryController = require('../modules/subcategory/SubCategoryController')
router.post('/addSubCate', async function (req, res) {
    const { subcateID, subcateName, parentCategory } = req.body;
    try {
        const subcategory = await SubCategoryController.insert(subcateID, subcateName, parentCategory);
        res.status(200).json(subcategory)
    } catch (error) {
        if (error.status) {
            res.status(error.status).json({ error: error.message });
        } else {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
});

module.exports = router;