import { FaChevronDown, FaChevronUp, FaTrashAlt, FaTag, FaPercentage, FaPause } from "react-icons/fa";

const Cart = ({ 
  cartItems, 
  updateCartItem, 
  deleteCartItem, 
  setIsPaymentPageVisible,
  setIsCouponModalOpen, 
  setIsDiscountModalOpen 
}) => {
  
  const calculateTotal = () => {
    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const tax = subtotal * 0.1;
    return { subtotal, tax, total: subtotal + tax };
  };

  const { subtotal, tax, total } = calculateTotal();

  return (
    <div className="w-[40%] pl-4 flex flex-col h-full">
      <h2 className="text-xl font-semibold mb-4">Cart Items</h2>

      {/* Cart Items List */}
      <div className="flex-grow overflow-y-auto space-y-4 max-h-[calc(100vh-250px)]">
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div key={item.id} className="border rounded-lg p-4 shadow bg-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <img src={item.image} alt={item.name} className="w-16 h-16 rounded-md" />
                  <div className="ml-4">
                    <h5 className="text-lg font-bold">{item.name}</h5>
                    <p>${item.price} x {item.quantity}</p>
                  </div>
                </div>
                <p className="text-lg font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                <FaTrashAlt className="text-red-500 cursor-pointer" onClick={() => deleteCartItem(item.id)} />
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">Your cart is empty.</p>
        )}
      </div>

      {/* Summary Section */}
      <div className="bg-white shadow p-4 mt-4">
        <div className="space-y-4 border-t ">
          <div className="flex justify-between text-lg font-bold">
            <p>Subtotal</p>
            <p>${subtotal.toFixed(2)}</p>
          </div>
          <div className="flex justify-between text-lg">
            <p>Tax (10%)</p>
            <p>${tax.toFixed(2)}</p>
          </div>
          <div className="flex justify-between text-lg font-bold">
            <p>Total</p>
            <p>${total.toFixed(2)}</p>
          </div>

          {/* Buttons Section */}
          <div className="grid grid-cols-3 gap-2 mt-4">
            <button
              className="flex items-center justify-center gap-2 p-2 bg-gray-300 rounded-lg"
              onClick={() => setIsCouponModalOpen(prev => !prev)}
            >
              <FaTag /> Coupon
            </button>
            <button
              className="flex items-center justify-center gap-2 p-2 bg-gray-300 rounded-lg"
              onClick={() => setIsDiscountModalOpen(prev => !prev)}
            >
              <FaPercentage /> Discount
            </button>
            <button className="flex items-center justify-center gap-2 p-2 bg-gray-300 rounded-lg">
              <FaPause /> Hold Order
            </button>
          </div>

          {/* Proceed to Payment */}
          <button 
            onClick={() => setIsPaymentPageVisible(true)} 
            className="w-full py-3 bg-blue-600 text-white rounded-lg mt-4 text-lg font-semibold"
          >
            Proceed to Pay (${total.toFixed(2)})
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;