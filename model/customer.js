const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const customerSchema = new Schema({
    customer_name: {
        type: String,
        required: true
    }
});

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;