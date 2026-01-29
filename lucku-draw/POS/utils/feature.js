exports.validateTransactionData = ({ transactionId , couponNo }) => {

  if (typeof transactionId !== 'string') {
    return "Transaction ID  must be a string";
  }
  if (!couponNo) {
    return "Coupon number is required";
  }
  return null; // no errors
};
exports.validateCustomerData = ({  customer, cell, transactionId  }) => {
const phoneRegex = /^[0-9]{11}$/;

  if ( typeof transactionId !== 'string') {
    return "Transaction ID is required and must be a string";
  }
  if (!customer) {
    return "Name is required";
  }
  if (!cell) {
    return "Phone Number is required";
  }
    if (!phoneRegex.test(cell)) {
      return "Invalid phone number format. It must be exactly 11 digits.";
      }

  return null; // no errors
};
