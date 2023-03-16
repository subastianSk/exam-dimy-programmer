const express = require('express');
const router = express.Router();
const {
    getAllCustomers,
    getCustomerById,
    createCustomer,
    updateCustomer,
    deleteCustomer
} = require('../controler/customer_controller');

const {
    createCustomerAddress,
    getCustomerAddresses
} = require('../controler/customerAddress_controller')

// GET /customers
router.get('/', getAllCustomers);

// GET /customers/:id
router.get('/:id', getCustomerById);

// POST /customers
router.post('/', createCustomer);

// PUT /customers/:id
router.put('/:id', updateCustomer);

// DELETE /customers/:id
router.delete('/:id', deleteCustomer);

// POST /customers/:id/addresses
router.post('/:id/addresses', createCustomerAddress);

// GET /customers/:id/addresses
router.get('/:id/addresses', getCustomerAddresses);

module.exports = router;