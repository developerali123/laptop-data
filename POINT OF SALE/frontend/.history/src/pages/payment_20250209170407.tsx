import Cart from "./Cart";
import 
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

  const handleAmountClick = (value) => {
    setAmount(value);
    updatePayment(value);
  };

  const handleKeypadClick = (value) => {
    if (value === "clear") setAmount("");
    else setAmount((prev) => prev + value);
  };

  const updatePayment = (value) => {
    const paying = parseFloat(value) || 0;
    setTotalPaying(paying);
    setPayLeft(totalDue - paying);
    setChange(paying > totalDue ? paying - totalDue : 0);
  };

  return (
    <div className="grid grid-cols-[auto,1fr] h-screen bg-white dark:bg-gray-900">
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

        <div className="grid grid-cols-4 gap-2 mt-4">
          {[147.4, 148, 150, 160].map((val) => (
            <button
              key={val}
              className="p-3 bg-gray-200 rounded"
              onClick={() => handleAmountClick(val)}
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
            >
              {key}
            </button>
          ))}
        </div>
      </div>

      {/* Cart Section (Right Side) */}
      <div className="w-[350px] min-w-[350px] h-full bg-gray-100 border-l flex flex-col p-4">
        <h2 className="text-lg font-bold">Cart Items</h2>
        {cartItems.length === 0 ? (
          <p className="text-gray-500">Your cart is empty.</p>
        ) : (
          <Cart 
            cartItems={cartItems} 
            updateCartItem={updateCartItem} 
            deleteCartItem={deleteCartItem} 
            setIsCouponModalOpen={setIsCouponModalOpen} 
            setIsDiscountModalOpen={setIsDiscountModalOpen} 
            setIsPaymentPageVisible={() => {}} 
          />
        )}

        <div className="bg-white p-4 rounded mt-4 shadow">
          <p className="flex justify-between">
            <span>Subtotal:</span>
            <span>${totalDue.toFixed(2)}</span>
          </p>
          <p className="flex justify-between">
            <span>Tax (10%):</span>
            <span>${(totalDue * 0.1).toFixed(2)}</span>
          </p>
          <p className="flex justify-between font-bold">
            <span>Total:</span>
            <span>${(totalDue * 1.1).toFixed(2)}</span>
          </p>

          {/* Button Container Fix */}
          <div className="flex justify-between items-center gap-2 mt-3">
            <button 
              className="flex-1 bg-gray-300 p-2 rounded text-sm"
              onClick={() => setIsCouponModalOpen(true)}
            >
              Coupon
            </button>
            <button 
              className="flex-1 bg-gray-300 p-2 rounded text-sm"
              onClick={() => setIsDiscountModalOpen(true)}
            >
              Discount
            </button>
            <button className="flex-1 bg-gray-300 p-2 rounded text-sm">
              Hold Order
            </button>
          </div>

          <button className="w-full bg-blue-600 text-white p-3 rounded mt-4 text-lg">
            Proceed to Pay ${totalDue.toFixed(2)}
          </button>
        </div>
      </div>
    </div>
  );
}
