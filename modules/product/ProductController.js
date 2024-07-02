var ProductModule = require('./ProductModule');
const insert = async (image, name, attribute, price, size, sizeUser, color, productDescription, parentCategory, subParentCategory) => {
    try {
        const newProduct = new ProductModule({
            image: image,
            name: name,
            attribute: attribute,
            price: price,
            size: size,
            sizeUser: sizeUser,
            color: color,
            productDescription: productDescription,
            parentCategory: parentCategory,
            subParentCategory: subParentCategory
        })
        await newProduct.save();
        return newProduct;
    } catch (error) {
        throw error;
    }
}

const getByParentCategory = async (parentCategory) => {
    try {
        let products = await ProductModule.find({ parentCategory: parentCategory });

        // Nếu không tìm thấy sản phẩm theo parentCategory, tìm theo subParentCategory
        if (products.length === 0) {
            products = await ProductModule.find({ subParentCategory: parentCategory });
        }

        return products;
    } catch (error) {
        throw error;
    }
}
const productDetail = async (id) => {
    try {
        const product = await ProductModule.findById(id);

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        return product;
    } catch (error) {
        throw error;
    }
}
const getAll = async () => {
    try {
        const products = await ProductModule.find();
        return products;
    } catch (error) {
        throw error;
    }

}

module.exports = { insert, getByParentCategory, getAll, productDetail };