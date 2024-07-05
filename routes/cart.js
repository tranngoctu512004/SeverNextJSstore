const express = require('express');
const router = express.Router();
const Cart = require('../modules/cart/CartModule')
const Product = require('../modules/product/ProductModule');
router.post('/addCart', async (req, res) => {
    const { userId, productId, quantity, color, size } = req.body;

    try {
        let cart = await Cart.findOne({ userId });

        if (!cart) {
            cart = new Cart({ userId, items: [], totalPrice: 0 });
        }

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).send('Product not found');
        }

        const cartItem = cart.items.find(item => item.productId.equals(productId) && item.color === color && item.size === size);

        if (cartItem) {
            cartItem.quantity += quantity;
        } else {
            cart.items.push({ productId, quantity, color, size });
        }

        cart.totalPrice = cart.items.reduce((total, item) => total + item.quantity * product.price, 0);

        await cart.save();

        res.status(200).send(cart);
    } catch (error) {
        if (error.status) {
            res.status(error.status).json({ error: error.message });
        } else {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
});

// Lấy giỏ hàng của người dùng
router.post('/getCart', async (req, res) => {
    const { userId } = req.body
    try {
        const cart = await Cart.findOne({ userId }).populate('items.productId');
        if (!cart) {
            return res.status(404).send('Cart not found');
        }
        res.status(200).send(cart);
    } catch (error) {
        if (error.status) {
            res.status(error.status).json({ error: error.message });
        } else {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
});
router.post('/increaseQuantity', async (req, res) => {
    const { userId, productId, color, size } = req.body;

    try {
        let cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).send('Cart not found');
        }

        const cartItem = cart.items.find(item => item.productId.equals(productId) && item.color === color && item.size === size);
        if (!cartItem) {
            return res.status(404).send('Cart item not found');
        }

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).send('Product not found');
        }

        cartItem.quantity += 1;
        cart.totalPrice = cart.items.reduce((total, item) => total + item.quantity * product.price, 0);

        await cart.save();

        res.status(200).send(cart);
    } catch (error) {
        if (error.status) {
            res.status(error.status).json({ error: error.message });
        } else {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
});
router.post('/removeFromCart', async (req, res) => {
    const { userId, productId, color, size } = req.body;

    try {
        let cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).send('Cart not found');
        }
        cart.items = cart.items.filter(item => !(item.productId.equals(productId) && item.color === color && item.size === size));

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).send('Product not found');
        }
        cart.totalPrice = cart.items.reduce((total, item) => total + item.quantity * product.price, 0);
        await cart.save();

        res.status(200).send(cart);
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