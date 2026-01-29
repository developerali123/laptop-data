import { useState, useEffect } from "react";
import Cart from "./Cart";

export default function PaymentPage({ cartItems, updateCartItem, deleteCartItem, setIsPaymentPageVisible }) {
  // Calculate Total Due based on Cart Items
  const totalDue = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("Cash");
  const [totalPaying, setTotalPaying] = useState(0);
  const [payLeft, setPayLeft] = useState(totalDue);
  const [change, setChange] = useState(0);

  // Update payment values whenever the amount changes
  useEffect(() => {
    updatePayment(amount);
  }, [amount]);

  const handleAmountClick = (value) => {
    const numericValue = typeof value === "string" ? parseFloat(value) || 0 : value;
    setAmount(numericValue.toString());
  };

  const handleKeypadClick = (value) => {
    if (value === "clear") {
      setAmount("");
    } else if (value === "←") {
      setAmount((prev) => prev.slice(0, -1) || "0");
    } else {
      setAmount((prev) => (prev === "0" ? value.toString() : prev + value.toString()));
    }
  };

  const updatePayment = (value) => {
    const paying = parseFloat(value) || 0;
    setTotalPaying(paying);
    setPayLeft(totalDue - paying);
    setChange(paying > totalDue ? paying - totalDue : 0);
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      {/* Payment Summary */}
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

      {/* Payment Input */}
      <div className="mt-4 flex gap-2">
        <input
          type="number"
          className="border p-2 w-full rounded"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => handleAmountClick(e.target.value)}
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

      {/* Quick Payment Buttons */}
      <div className="grid grid-cols-4 gap-2 mt-4">
        {[totalDue, totalDue + 1, totalDue + 2, totalDue + 10].map((val) => (
          <button
            key={val}
            className="p-3 bg-gray-200 rounded"
            onClick={() => handleAmountClick(val)}
          >
            ${val.toFixed(2)}
          </button>
        ))}
      </div>

      {/* Keypad */}
      <div className="grid grid-cols-4 gap-2 mt-4 text-center">
        {[1, 2, 3, "clear", 4, 5, 6, "←"].map((key) => (
          <button
            key={key}
            className="p-3 bg-gray-200 rounded"
            onClick={() => handleKeypadClick(key)}
          >
            {key}
          </button>
        ))}
      </div>

      {/* Cart Component */}
      <Cart
        cartItems={cartItems}
        updateCartItem={updateCartItem}
        deleteCartItem={deleteCartItem}
        setIsPaymentPageVisible={setIsPaymentPageVisible}
      />
    </div>
  );
}