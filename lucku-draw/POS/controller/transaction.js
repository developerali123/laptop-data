const prisma =  require('../lib/prisma');
const { validateTransactionData } = require('../utils/feature');

exports.getAllTransactions = async (req, res) => {
try {
 const transactions  =  await prisma.tmpCouponTable.findMany();
 res.status(200).json({
  status:"success",
  results:transactions.length,
  data:{
    transactions
  }
})
} catch (error) {
  console.log(error);
  res.status(400).json({
    status:"fail",
    message:error
  })
}

}

exports.getTransaction = async (req, res) => {
  try {
    const transactionId = req.params.id;
    const transaction = await prisma.tmpCouponTable.findMany({
    where: { transactionId: transactionId },
    select:{
      couponId:true,
      couponNo:true,
    }
    });
if (!transaction) {
  return res.status(404).json({
    success: false,
    message: "Transaction not found",
    data: null
  });
}

const customer = await prisma.tmpCustomerTable.findUnique({
  where: { transactionId: transactionId } ,
  select:{
    transactionId:true,
    customer:true,
    cell:true,

  }
});

return res.json({
  success: true,
  hasCustomer: !!customer, 
  data: {
    transaction:{
      [transactionId]: transaction
    },
    customer: customer || null
  }
});
    
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error
    });
  }

}

exports.createTransaction = async (req, res) => {
try {
  const { couponNo } = req.body;
  //Fields Validation
  const validationError = validateTransactionData(req.body);
    if (validationError) {
      return res.status(400).json({ status: "fail", message: validationError });
    }
//Check for existing couponNo or couponId
const existingCoupon = await prisma.tmpCouponTable.findFirst({
  where: {
    OR: [
      { couponNo: couponNo },
    ]
  }
});

if(existingCoupon){ 
  return res.status(400).json({
    status:"fail",
    message:"Coupon Already Assigned to another transaction"
  })
}
//Create Transaction
const transaction =  await prisma.tmpCouponTable.create({
            data: req.body
        });
    res.status(201).json({
      status:"success",
      message:"Transaction created successfully",
      data:{
        transaction
      }
    })
} catch(error) {
  console.log(error);
  
  res.status(400).json({
    status:"fail",
    message:error
  }
) 
}
}
  




