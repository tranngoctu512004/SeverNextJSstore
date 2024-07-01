var SliderModule = require('./sliderModule');

const getAll = async () => {
    try {
        const getAllSlider = await SliderModule.find();
        return getAllSlider;
    } catch (error) {
        throw error;
    }

}
const insert = async (image, path) => {
    try {
        const newSlider = new SliderModule({
            image: image,
            path: path
        })
        await newSlider.save();
        return newSlider;
    } catch (error) {
        throw error;
    }
}
module.exports = { getAll, insert };