import { useState, useEffect } from "react";
import Cart from "./Cart"; // Import the Cart component

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
    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const tax = subtotal * 0.1; // 10% tax
    const calculatedTotal = subtotal + tax;
    setTotalDue(calculatedTotal);
    setPayLeft(calculatedTotal - totalPaying);
  }, [cartItems, totalPaying]);

  const handleAmountChange = (value) => {
    setAmount(value);
    updatePayment(value);
  };

  const handleKeypadClick = (value) => {
    if (value === "clear") {
      setAmount("");
      updatePayment(0);
    } else if (value === "←") {
      setAmount((prev) => prev.slice(0, -1));
      updatePayment(amount.slice(0, -1));
    } else {
      const newAmount = amount + value;
      setAmount(newAmount);
      updatePayment(newAmount);
    }
  };

  const updatePayment = (value) => {
    const paying = parseFloat(value) || 0;
    setTotalPaying(paying);
    setPayLeft(totalDue - paying);
    setChange(Math.max(paying - totalDue, 0));
  };

  return (
    <div className="grid grid-cols-[1fr,400px] h-screen bg-white dark:bg-gray-900">
      {/* Payment Section (Left Side) */}
      <div className="flex-1 p-8">
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

        {/* Input & Payment Method Selection */}
        <div className="mt-4 flex gap-2">
          <input
            type="number"
            className="border p-2 w-full rounded"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => handleAmountChange(e.target.value)}
          />
          <select className="border p-2 rounded" value={method} onChange={(e) => setMethod(e.target.value)}>
            <option>Cash</option>
            <option>Card</option>
            <option>UPI</option>
          </select>
        </div>

        <button className="mt-2 w-full bg-blue-600 text-white p-2 rounded">
          Add Another Payment Method
        </button>

        <textarea className="w-full mt-2 p-2 border rounded" placeholder="Add Order Note" />

        {/* Quick Payment Buttons */}
        <div className="grid grid-cols-4 gap-2 mt-4">
          {[207.90, 208.00, 210.00, 220.00].map((val) => (
            <button key={val} className="p-3 bg-gray-200 rounded" onClick={() => handleAmountChange(val)}>
              ${val.toFixed(2)}
            </button>
          ))}
        </div>

        {/* Keypad */}
        <div className="grid grid-cols-4 hover:border-blue-700 gap-2 mt-4 text-center">
          {[1, 2, 3, "clear", 4, 5, 6, "←", 7, 8, 9, "Pay", 0, ".", "00", "Cancel"].map((key) => (
            <button key={key} className={`p-3 ${key === "Pay" ? "bg-blue-600  text-white" : "bg-gray-200 "} rounded`} onClick={() => handleKeypadClick(key)}>
              {key}
            </button>
          ))}
        </div>
      </div>

      {/* Cart Section (Right Side) */}
      <div className="w-[400px] min-w-[350px] h-full bg-gray-100 border-l flex flex-col p-8">
        <h2 className="text-lg font-bold">Cart Items</h2>
        {cartItems.length === 0 ? (
          <p className="text-gray-500">Your cart is empty.</p>
        ) : (
          <Cart cartItems={cartItems} updateCartItem={updateCartItem} deleteCartItem={deleteCartItem} />
        )}

        {/* Order Summary */}
        <div className="bg-white p-4 rounded mt-4 shadow">
          <p className="flex justify-between">
            <span>Subtotal:</span>
            <span>${(totalDue / 1.1).toFixed(2)}</span>
          </p>
          <p className="flex justify-between">
            <span>Tax (10%):</span>
            <span>${(totalDue - totalDue / 1.1).toFixed(2)}</span>
          </p>
          <p className="flex justify-between">
            <span>Discount:</span>
            <span>$0.00</span>
          </p>
          <p className="flex justify-between">
            <span>Applied Coupon(s):</span>
            <span>N/A</span>
          </p>

          {/* Payment Options */}
          <div className="flex justify-between items-center gap-2 mt-3">
            <button className="flex-1 bg-gray-300 p-2 rounded text-sm" onClick={() => setIsCouponModalOpen(true)}>
              Coupon
            </button>
            <button className="flex-1 bg-gray-300 p-2 rounded text-sm" onClick={() => setIsDiscountModalOpen(true)}>
              Discount
            </button>
            <button className="flex-1 bg-gray-300 p-2 rounded text-sm">Hold Order</button>
          </div>

          <button className="w-full bg-blue-600 text-white p-3 rounded mt-4 text-lg">
            Proceed to Pay ${totalDue.toFixed(2)}
          </button>
        </div>
      </div>
    </div>
  );
}
