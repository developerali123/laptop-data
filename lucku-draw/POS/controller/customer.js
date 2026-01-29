const prisma =  require('../lib/prisma');
const { validateCustomerData } = require('../utils/feature');


exports.getAllCustomer = async (req, res) => {
try {
 const customers  =  await prisma.tmpCustomerTable.findMany();
 res.status(200).json({
  status:"success",
  results:customers.length,
  data:{
    customers
  }
})
} catch (error) {
  res.status(400).json({
    status:"fail",
    message:error
  })
}

}
exports.createCustomer = async (req, res) => {
  try {
    const {customer,cell,transactionId } = req.body;
   const validationError =  validateCustomerData(req.body);

     if (validationError) {
      return res.status(400).json({ status: "fail", message: validationError });
    }
    const transaction = await prisma.tmpCouponTable.findFirst({
      where: { transactionId: transactionId },
    });

    if (!transaction) {
      return res.status(404).json({
        status: "fail",
        message: "Transaction not found for the given transaction ID.",
      });
    }

    const existingCustomer = await prisma.tmpCustomerTable.findUnique({
      where: { transactionId: transactionId },
    });

    if (existingCustomer) {
      return res.status(400).json({
        status: "fail",
        message: "A customer already exists for this transaction.",
      });
    }

    const customerData = await prisma.tmpCustomerTable.create({
      data: {
        customer,
        cell,
        transactionId: transactionId,
      },
    });

    return res.status(201).json({
      status: "success",
      message: "Customer created successfully",
      data: { customerData },
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "error",
      message: error.message || "Something went wrong on the server.",
    });
  }
};


exports.getCustomerName= async(req,res)=>{
  try {
   const phone_no = req.params.phone_no;
   if (!phone_no) {
    return res.status(400).json({
      status:"fail",
      message:"Phone number is required"
    })
   }
   if(phone_no.length !==11){
    return res.status(400).json({
      status:"fail",
      message:"Phone number must be 11 digits"
    })
   }
    const customer = await prisma.tmpCustomerTable.findFirst({
    where: { cell: phone_no },
    orderBy: {
    createdDateTime: 'desc', 
  },
    select:{
      customer:true,
      cell:true,
    }
    });
    res.status(200).json({
      status:"success",
      data:{
        customer
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