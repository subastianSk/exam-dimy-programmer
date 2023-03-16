const express = require('express');
const router = express.Router();

const {
    createPaymentMethod,
    getIdPaymentMethods,
    getAllPaymentMethods,
    deletePaymentMethod
} = require('../controler/paymentMethod_controller');

const {
    createTransaction,
    getTransactionById,
    getAllTransactions
} = require('../controler/transaction_controller');

// Payment
router.post('/', createPaymentMethod);
router.get('/:id', getIdPaymentMethods);
router.get('/', getAllPaymentMethods);
router.delete('/:id', deletePaymentMethod);

//transaction
router.post('/transactions/:customer_id/:product_id/:payment_method_id', createTransaction);
router.get('/:transactionId', getTransactionById);
router.get('/transactions', getAllTransactions);

module.exports = router;