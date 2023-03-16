const CustomerAddress = require('../model/customerAddress');

// create a new customer address
const createCustomerAddress = async (req, res) => {
    try {
        const customerAddress = new CustomerAddress({
            customer_id: req.params.id,
            address: req.body.address
        });

        const newCustomerAddress = await customerAddress.save();

        res.status(201).json({
            status: 1,
            message: "Customer address created successfully",
            result: newCustomerAddress
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: 0,
            message: "Failed to create customer address"
        });
    }
};

// get all customer addresses
const getCustomerAddresses = async (req, res) => {
    try {
        const customerAddresses = await CustomerAddress.find();
        res.status(200).json({
            status: 1,
            message: "",
            result: customerAddresses
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: 0,
            message: "Failed to get customer addresses"
        });
    }
};

module.exports = {
    createCustomerAddress,
    getCustomerAddresses
};