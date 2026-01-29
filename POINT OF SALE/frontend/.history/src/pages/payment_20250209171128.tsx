import Cart from "./Cart";
import { useState,useEffect } from "react";
export default function PaymentPage({ cartTotal }) {
  const [totalPaying, setTotalPaying] = useState(0);
  const [payLeft, setPayLeft] = useState(cartTotal);
  const [change, setChange] = useState(0);
  const [amount, setAmount] = useState("");

  const handleAmountClick = (value) => {
    setAmount(value);
    updatePayment(value);
  };

  const updatePayment = (value) => {
    const paying = parseFloat(value) || 0;
    setTotalPaying(paying);
    setPayLeft(cartTotal - paying);
    setChange(paying > cartTotal ? paying - cartTotal : 0);
  };

  return (
    <div className="p-8">
      <div className="grid grid-cols-4 gap-4 text-center text-lg font-bold">
        <div className="bg-gray-100 p-4 rounded">
          <p>Total Due</p>
          <p className="text-blue-600">${cartTotal.toFixed(2)}</p>
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

      <input
        type="number"
        className="border p-2 w-full rounded mt-4"
        placeholder="Enter amount"
        value={amount}
        onChange={(e) => handleAmountClick(e.target.value)}
      />

      <button className="mt-2 w-full bg-blue-600 text-white p-2 rounded">
        Confirm Payment
      </button>
    </div>
  );
}

