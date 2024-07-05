const cache = require('memory-cache');

const productsByCategoryCache = (req, res, next) => {
    const id = req.body.id;
    const cachedData = cache.get(`productsByCategory_${id}`);
    if (cachedData) {
        res.json(cachedData);
    } else {
        next();
    }
};
const productDetailCache = (req, res, next) => {
    const id = req.body.id;
    const cachedData = cache.get(`productDetail_${id}`);
    if (cachedData) {
        res.json(cachedData);
    } else {
        next();
    }
};
const allProductsCache = (req, res, next) => {
    const cachedData = cache.get('allProducts');
    if (cachedData) {
        res.json(cachedData);
    } else {
        next();
    }
};


module.exports = { productsByCategoryCache, productDetailCache, allProductsCache }
