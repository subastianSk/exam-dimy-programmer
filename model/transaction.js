const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
    customer_id: {
        type: Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    },
    customer_address_id: {
        type: Schema.Types.ObjectId,
        ref: 'CustomerAddress',
        required: true
    },
    created_at: {
        type: Date,
        required: true,
        default: Date.now
    },
    products: [{
        product_id: {
            type: Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        quantity: {
            type: Number,
            required: true
        }
    }],
    payment_methods: [{
        payment_method_id: {
            type: Schema.Types.ObjectId,
            ref: 'PaymentMethod',
            required: true
        }
    }]
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;