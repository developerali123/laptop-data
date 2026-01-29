const express = require('express');
const transactionRouter = require('./routes/transactionRoutes');
const customerRouter = require('./routes/customerRoutes');

const app = express();
app.use(express.json());

app.use('/api/v1/transactions', transactionRouter)
app.use('/api/v1/customer', customerRouter)
app.use("/api/v1/test", (req, res) => {
    res.json({
        messsage: "working"
    })
})


module.exports = app;

