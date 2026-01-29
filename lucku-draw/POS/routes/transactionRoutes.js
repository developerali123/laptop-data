const express = require('express');
const { getAllTransactions, createTransaction, getTransaction } = require('../controller/transaction');
const transactionRouter = express.Router();

transactionRouter.route('/').get(getAllTransactions).post(createTransaction);
transactionRouter.route('/:id').get(getTransaction);



module.exports = transactionRouter;

