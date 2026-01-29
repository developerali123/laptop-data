const express = require('express');
const { getAllCustomer, createCustomer, getCustomerName } = require('../controller/customer');
const customerRouter = express.Router();

customerRouter.route('/').get(getAllCustomer).post(createCustomer);
customerRouter.route('/:phone_no').get(getCustomerName);



module.exports = customerRouter;