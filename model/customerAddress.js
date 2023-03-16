const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const customerAddressSchema = new Schema({
    customer_id: {
        type: Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    },
    address: {
        type: String,
        required: true
    }
});

const CustomerAddress = mongoose.model('CustomerAddress', customerAddressSchema);

module.exports = CustomerAddress;