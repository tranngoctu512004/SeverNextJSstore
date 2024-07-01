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
module.exports = { insert };