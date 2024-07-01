var UserModule = require('./UserModule');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 5;

const insert = async (name, email, password) => {
    if (!name || !email || !password) {
        return { error: 'Điền đầy đủ thông tin', status: 422 };
    }
    try {
        const existingUser = await UserModule.findOne({ email });
        if (existingUser) {
            return { error: 'Email đã được đăng ký', status: 422 };
        }
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        console.log(hashedPassword);
        const newUser = new UserModule({
            name: name,
            email: email,
            password: hashedPassword
        });
        await newUser.save();
        const token = jwt.sign({ _id: newUser._id }, process.env.JWT_SECRET);
        return { token, status: 200 };
    } catch (error) {
        console.error('Error inserting user:', error);
        return { error: 'Something went wrong', status: 500 };
    }
}
const login = async (email, password) => {
    if (!email || !password) {
        return { error: 'Điền đầy đủ thông tin', status: 422 };
    }
    try {
        const savedUser = await UserModule.findOne({ email });
        if (!savedUser) {
            return {
                error: 'Tài khoản không hợp lệ', status: 422
            };
        }
        const isMatch = bcrypt.compareSync(password, savedUser.password);
        if (isMatch) {
            console.log('Password match');
            const token = jwt.sign({ _id: savedUser._id }, process.env.JWT_SECRET);
            return { token: token, status: 200 };
        } else {
            console.log('Password does not match');
            return {
                error: 'Mật khẩu không hợp lệ', status: 422
            };
        }
    } catch (error) {
        console.error('Error login:', error);
        throw error;
    }

}

const getAll = async () => {
    try {
        const users = await UserModule.find();
        return users;
    } catch (error) {
        console.error('Error getting all users:', error);
        throw error;
    }
}


const remove = async (UserId) => {
    try {
        await UserModule.deleteOne({ _id: UserId });
    } catch (error) {
        console.error('Error removing user:', error);
        throw error;
    }
}

const update = async (UserId, name, phone, email, location, level) => {
    try {
        const user = await UserModule.findByIdAndUpdate(UserId, { name: name, email: email, password: password });
        return user;
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
}

module.exports = { insert, getAll, remove, update, login };
