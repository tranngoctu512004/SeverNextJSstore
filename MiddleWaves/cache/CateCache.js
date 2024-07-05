const cache = require('memory-cache');

const cacheMiddleware = (req, res, next) => {
    const cachedData = cache.get('AllCategories');
    if (cachedData) {
        res.send(cachedData);
    } else {
        next();
    }
};


module.exports = cacheMiddleware;
