const Transaction = require('../model/transaction');
const Product = require('../model/product');
const Customer = require('../model/customer');
const CustomerAddress = require('../model/customerAddress');
const PaymentMethod = require('../model/paymentMethod');

const createTransaction = async (req, res) => {
    try {
        const {
            customer_id,
            product_id,
            payment_method_id
        } = req.params;
        const {
            quantity
        } = req.body;

        // check if customer, product, customer address, and payment method exist
        const customer = await Customer.findById(customer_id);
        if (!customer) {
            return res.status(404).json({
                status: 0,
                message: 'Customer not found'
            });
        }

        const product = await Product.findById(product_id);
        if (!product) {
            return res.status(404).json({
                status: 0,
                message: 'Product not found'
            });
        }
        const totalHarga = quantity * product.price;

        const customerAddress = await CustomerAddress.findOne({
            customer_id: customer_id
        });
        if (!customerAddress) {
            return res.status(404).json({
                status: 0,
                message: 'Customer address not found'
            });
        }

        const paymentMethod = await PaymentMethod.findById(payment_method_id);
        if (!paymentMethod) {
            return res.status(404).json({
                status: 0,
                message: 'Payment method not found'
            });
        }

        const transaction = new Transaction({
            customer_id: customer_id,
            customer_address_id: customerAddress._id,
            products: [{
                product_id: product_id,
                quantity: quantity,
                price: product.price,
                total_harga: totalHarga
            }],
            payment_methods: [{
                payment_method_id: payment_method_id,
                name_kartu: paymentMethod.name_kartu
            }]
        });

        const savedTransaction = await transaction.save();

        res.status(201).json({
            status: 1,
            message: '',
            total_harga: totalHarga,
            result: savedTransaction
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: 0,
            message: 'Failed to create transaction'
        });
    }
};

const getTransactionById = async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.id)
            .populate('customer_id')
            .populate({
                path: 'customer_address_id',
                populate: {
                    path: 'customer_id',
                    model: 'Customer'
                }
            })
            .populate({
                path: 'products.product_id',
                populate: {
                    path: 'category_id',
                    model: 'Category'
                }
            })
            .populate('payment_methods.payment_method_id')
            .exec();

        if (!transaction) {
            return res.status(404).json({
                status: 0,
                message: 'Transaction not found'
            });
        }

        res.status(200).json({
            status: 1,
            message: '',
            result: transaction
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: 0,
            message: 'Failed to get transaction'
        });
    }
};

const getAllTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find()
            .populate('customer_id')
            .populate({
                path: 'customer_address_id',
                populate: {
                    path: 'customer_id',
                    model: 'Customer'
                }
            })
            .populate({
                path: 'products.product_id',
                populate: {
                    path: 'category_id',
                    model: 'Category'
                }
            })
            .populate('payment_methods.payment_method_id')
            .exec();

        res.status(200).json({
            status: 1,
            message: '',
            result: transactions
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: 0,
            message: 'Failed to get transactions'
        });
    }
};


module.exports = {
    createTransaction,
    getTransactionById,
    getAllTransactions
};