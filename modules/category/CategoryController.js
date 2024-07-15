var categoryModule = require('./CategoryModule')
var subCateModule = require('../subcategory/SubCategoryModule')

const insert = async (cateID, cateName) => {
    try {
        const newCate = new categoryModule({
            cateID: cateID,
            cateName: cateName
        })
        await newCate.save();
        return newCate;
    } catch (error) {
        throw error;
    }
}
const getAll = async () => {
    try {
        const getAllCate = await categoryModule.find();
        return getAllCate;
    } catch (error) {
        throw error;
    }
}
const remove = async (CateID) => {
    try {
        await categoryModule.deleteOne({ _id: CateID });
    } catch (error) {
        throw error;
    };
}
// const update = async (QuestionId, question, answers) => {
//     try {
//         const questionLv1 = await categoryModule.findByIdAndUpdate(QuestionId, { question: question, answers: answers });
//         return questionLv1;
//     } catch (error) {
//         throw error;
//     }
// }
const getByCateID = async (CateID) => {
    try {
        let getCate = await categoryModule.find({ _id: CateID });
        if (!getCate.length) {
            getCate = await subCateModule.find({ _id: CateID });
        }
        return getCate;
    } catch (error) {
        throw error;
    }

}
module.exports = { insert, getAll, remove, getByCateID };