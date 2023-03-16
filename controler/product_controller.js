const Product = require('../model/product');

// GET all products
const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json({
            status: 1,
            message: "",
            result: products
        });
    } catch (error) {
        res.status(500).json({
            status: 0,
            message: error.message
        });
    }
};

// GET a product by ID
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        res.status(200).json({
            status: 1,
            message: "",
            result: product
        });
    } catch (error) {
        res.status(500).json({
            status: 0,
            message: error.message
        });
    }
};

// POST a new product
const createProduct = async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(201).json({
            status: 1,
            message: "",
            result: product
        });
    } catch (error) {
        res.status(500).json({
            status: 0,
            message: error.message
        });
    }
};

// PUT (update) an existing product
const updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        });
        res.status(200).json({
            status: 1,
            message: "",
            result: product
        });
    } catch (error) {
        res.status(500).json({
            status: 0,
            message: error.message
        });
    }
};

// DELETE a product by ID
const deleteProduct = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json({
            status: 1,
            message: "Product deleted successfully",
            result: null
        });
    } catch (error) {
        res.status(500).json({
            status: 0,
            message: error.message
        });
    }
};

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};