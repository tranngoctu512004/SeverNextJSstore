var SubCategoryModule = require('./SubCategoryModule')

const insert = async (subcateID, subcateName, parentCategory) => {
    try {
        const newCate = new SubCategoryModule({
            subcateID: subcateID,
            subcateName: subcateName,
            parentCategory: parentCategory

        })
        await newCate.save();
        return newCate;
    } catch (error) {
        throw error;
    }
}
module.exports = { insert };