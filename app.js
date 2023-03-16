const express = require('express');
const app = express();
const cors = require('cors');
const customerRouter = require('./router/customer_router');
const productRouter = require('./router/product_router');
const paymentMethod = require('./router/payment_router');

app.use(cors());
app.options('*', cors())


if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

//____
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));


app.use('/customers', customerRouter);
app.use('/product', productRouter);
app.use('/payment', paymentMethod);

module.exports = app