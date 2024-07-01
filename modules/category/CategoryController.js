var categoryModule = require('./CategoryModule')

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
module.exports = { insert, getAll, remove };