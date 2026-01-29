import React, { useState, useEffect } from 'react';
import Cart
export default function PaymentPage({ 
  cartItems = [], 
  updateCartItem, 
  deleteCartItem, 
  setIsCouponModalOpen, 
  setIsDiscountModalOpen 
}) {
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("Cash");
  const [totalDue, setTotalDue] = useState(0);
  const [totalPaying, setTotalPaying] = useState(0);
  const [payLeft, setPayLeft] = useState(0);
  const [change, setChange] = useState(0);

  useEffect(() => {
    const calculatedTotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0) * 1.1;
    setTotalDue(calculatedTotal);
    setPayLeft(calculatedTotal);
  }, [cartItems]);

  useEffect(() => {
    updatePayment(amount);
  }, [amount, totalDue]);

  const handleAmountClick = (value) => {
    setAmount(value.toString());
  };

  const handleKeypadClick = (value) => {
    if (value === "clear") {
      setAmount("");
    } else if (value === "←") {
      setAmount((prev) => prev.slice(0, -1));
    } else {
      setAmount((prev) => prev + value.toString());
    }
  };

  const updatePayment = (value) => {
    const paying = parseFloat(value) || 0;
    setTotalPaying(paying);
    setPayLeft(totalDue - paying);
    setChange(paying > totalDue ? paying - totalDue : 0);
  };

  return (
    <div className="grid grid-cols-[2fr_1fr] h-screen bg-white dark:bg-gray-900">
      
      {/* Left Side - Payment Section */}
      <div className="p-8">
        <div className="grid grid-cols-4 gap-4 text-center text-lg font-bold">
          <div className="bg-gray-100 p-4 rounded">
            <p>Total Due</p>
            <p className="text-blue-600">${totalDue.toFixed(2)}</p>
          </div>
          <div className="bg-gray-100 p-4 rounded">
            <p>Total Paying</p>
            <p className="text-green-600">${totalPaying.toFixed(2)}</p>
          </div>
          <div className="bg-gray-100 p-4 rounded">
            <p>Pay Left</p>
            <p className="text-red-600">${payLeft.toFixed(2)}</p>
          </div>
          <div className="bg-gray-100 p-4 rounded">
            <p>Change</p>
            <p className="text-yellow-600">${change.toFixed(2)}</p>
          </div>
        </div>

        <div className="mt-4 flex gap-2">
          <input
            type="number"
            className="border p-2 w-full rounded"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            min="0"
            step="0.01"
          />
          <select
            className="border p-2 rounded"
            value={method}
            onChange={(e) => setMethod(e.target.value)}
          >
            <option>Cash</option>
            <option>Card</option>
            <option>UPI</option>
          </select>
        </div>

        <button className="mt-2 w-full bg-blue-600 text-white p-2 rounded">
          Add Another Payment Method
        </button>

        <textarea className="w-full mt-2 p-2 border rounded" placeholder="Add Order Note" />

        <div className="grid grid-cols-4 gap-2 mt-4">
          {[147.4, 148, 150, 160].map((val) => (
            <button
              key={val}
              className="p-3 bg-gray-200 rounded"
              onClick={() => handleAmountClick(val)}
              aria-label={`Pay $${val.toFixed(2)}`}
            >
              ${val.toFixed(2)}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-4 gap-2 mt-4 text-center">
          {[1, 2, 3, "clear", 4, 5, 6, "←"].map((key) => (
            <button
              key={key}
              className="p-3 bg-gray-200 rounded"
              onClick={() => handleKeypadClick(key)}
              aria-label={key === "←" ? "Backspace" : key === "clear" ? "Clear" : `Number ${key}`}
            >
              {key}
            </button>
          ))}
        </div>
      </div>

      {/* Right Side - Cart Section */}
      <div className="h-full bg-gray-100 border-l p-4 flex flex-col">
        <Cart 
          cartItems={cartItems} 
          updateCartItem={updateCartItem} 
          deleteCartItem={deleteCartItem} 
          setIsCouponModalOpen={setIsCouponModalOpen} 
          setIsDiscountModalOpen={setIsDiscountModalOpen} 
          setIsPaymentPageVisible={() => {}} // No need to toggle payment page here
        />
      </div>
      
    </div>
  );
}