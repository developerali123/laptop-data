import { useState } from "react";

export default function PaymentPage({ total }) {
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("Cash");
  const [totalPaying, setTotalPaying] = useState(0);
  const [payLeft, setPayLeft] = useState(total);
  const [change, setChange] = useState(0);

  const handleAmountClick = (value) => {
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
      setAmount((prev) => prev + value);
      updatePayment(amount + value);
    }
  };

  const updatePayment = (value) => {
    const paying = parseFloat(value) || 0;
    setTotalPaying(paying);
    setPayLeft(total - paying);
    setChange(paying > total ? paying - total : 0);
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <h2 className="text-xl font-bold text-center mb-4">Payment</h2>

      <div className="grid grid-cols-4 gap-4 text-center text-lg font-bold">
        <div className="bg-gray-100 p-4 rounded">
          <p>Total Due</p>
          <p className="text-blue-600">${total.toFixed(2)}</p>
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
          onChange={(e) => handleAmountClick(e.target.value)}
        />
        <select className="border p-2 rounded" value={method} onChange={(e) => setMethod(e.target.value)}>
          <option>Cash</option>
          <option>Card</option>
          <option>UPI</option>
        </select>
      </div>

      <button className="mt-2 w-full bg-blue-600 text-white p-2 rounded">Add Another Payment Method</button>

      <textarea className="w-full mt-2 p-2 border rounded" placeholder="Add Order Note" />

      <div className="grid grid-cols-4 gap-2 mt-4">
        {[total, total + 1, total + 2, total + 5].map((val) => (
          <button key={val} className="p-3 bg-gray-200 rounded" onClick={() => handleAmountClick(val)}>
            ${val.toFixed(2)}
          </button>
        ))}
      </div>
    </div>
  );
}
