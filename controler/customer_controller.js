const Customer = require('../model/customer');

// GET /customers
const getAllCustomers = async (req, res) => {
    try {
        const customers = await Customer.find();
        res.status(200).json({
            status: 1,
            message: "Successfully retrieved all customers",
            result: customers
        });
    } catch (err) {
        res.status(500).json({
            status: 0,
            message: "Failed to retrieve customers"
        });
    }
};

// GET /customers/:id
const getCustomerById = async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id);
        if (customer) {
            res.status(200).json({
                status: 1,
                message: "Successfully retrieved customer",
                result: customer
            });
        } else {
            res.status(404).json({
                status: 0,
                message: "Customer not found"
            });
        }
    } catch (err) {
        res.status(500).json({
            status: 0,
            message: "Failed to retrieve customer"
        });
    }
};

// POST /customers
const createCustomer = async (req, res) => {
    try {
        const newCustomer = new Customer({
            customer_name: req.body.customer_name
        });
        const savedCustomer = await newCustomer.save();
        res.status(201).json({
            status: 1,
            message: "Successfully created customer",
            result: savedCustomer
        });
    } catch (err) {
        res.status(500).json({
            status: 0,
            message: "Failed to create customer"
        });
    }
};

// PUT /customers/:id
const updateCustomer = async (req, res) => {
    try {
        const customer = await Customer.findByIdAndUpdate(
            req.params.id, {
                customer_name: req.body.customer_name
            }, {
                new: true
            }
        );
        if (customer) {
            res.status(200).json({
                status: 1,
                message: "Successfully updated customer",
                result: customer
            });
        } else {
            res.status(404).json({
                status: 0,
                message: "Customer not found"
            });
        }
    } catch (err) {
        res.status(500).json({
            status: 0,
            message: "Failed to update customer"
        });
    }
};

// DELETE /customers/:id
const deleteCustomer = async (req, res) => {
    try {
        const customer = await Customer.findByIdAndDelete(req.params.id);
        if (customer) {
            res.status(200).json({
                status: 1,
                message: "Successfully deleted customer",
                result: customer
            });
        } else {
            res.status(404).json({
                status: 0,
                message: "Customer not found"
            });
        }
    } catch (err) {
        res.status(500).json({
            status: 0,
            message: "Failed to delete customer"
        });
    }
};

module.exports = {
    getAllCustomers,
    getCustomerById,
    createCustomer,
    updateCustomer,
    deleteCustomer
};