const PaymentMethod = require('../model/paymentMethod');

const createPaymentMethod = async (req, res) => {
    try {
        const {
            name_kartu
        } = req.body;
        const paymentMethod = await PaymentMethod.create({
            name_kartu
        });
        res.status(201).json({
            status: 1,
            message: 'Payment method created successfully',
            result: paymentMethod
        });
    } catch (error) {
        res.status(500).json({
            status: 0,
            message: 'Failed to create payment method'
        });
    }
};

const getAllPaymentMethods = async (req, res) => {
    try {
        const paymentMethods = await PaymentMethod.find({
            is_active: true
        });
        res.status(200).json({
            status: 1,
            message: 'Payment methods retrieved successfully',
            result: paymentMethods
        });
    } catch (error) {
        res.status(500).json({
            status: 0,
            message: 'Failed to retrieve payment methods'
        });
    }
};

const getIdPaymentMethods = async (req, res) => {
    try {
        const paymentMethod = await PaymentMethod.findById(req.params.id);
        if (!paymentMethod) {
            res.status(404).json({
                status: 0,
                message: 'Payment method not found'
            });
        } else {
            res.status(200).json({
                status: 1,
                message: 'Payment method retrieved successfully',
                result: paymentMethod
            });
        }
    } catch (error) {
        res.status(500).json({
            status: 0,
            message: 'Failed to retrieve payment method'
        });
    }
};


const deletePaymentMethod = async (req, res) => {
    try {
        const paymentMethod = await PaymentMethod.findById(req.params.id);
        if (!paymentMethod) {
            res.status(404).json({
                status: 0,
                message: 'Payment method not found'
            });
        } else {
            paymentMethod.is_active = false;
            await paymentMethod.save();
            res.status(200).json({
                status: 1,
                message: 'Payment method soft deleted successfully',
                result: paymentMethod
            });
        }
    } catch (error) {
        res.status(500).json({
            status: 0,
            message: 'Failed to soft delete payment method'
        });
    }
};




module.exports = {
    createPaymentMethod,
    getIdPaymentMethods,
    getAllPaymentMethods,
    deletePaymentMethod
};