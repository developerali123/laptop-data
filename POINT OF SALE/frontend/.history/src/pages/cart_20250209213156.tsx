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

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) return; // Ensure quantity doesn't go below 1
    updateCartItem(id, newQuantity);
  };

  return (
    <div className="w-full md:w-[40%] pl-4 flex max-h-[calc(100vh-100px)] overflow-y-auto flex-col h-full">
      <h2 className="text-xl font-semibold border-t pt-4 mb-4">Cart Items</h2>

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
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <button
                      aria-label="Decrease quantity"
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      className="p-1 bg-gray-200 rounded-full hover:bg-gray-300"
                    >
                      <FaChevronDown className="text-sm" />
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      aria-label="Increase quantity"
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      className="p-1 bg-gray-200 rounded-full hover:bg-gray-300"
                    >
                      <FaChevronUp className="text-sm" />
                    </button>
                  </div>
                  <p className="text-lg font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                  <button
                    aria-label="Delete item"
                    onClick={() => deleteCartItem(item.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrashAlt className="cursor-pointer" />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">Your cart is empty.</p>
        )}
      </div>

      {/* Summary Section */}
      <div className="bg-white shadow p-4 mt-4">
        <div className="space-y-4 border-t pt-4">
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
              aria-label="Apply coupon"
              className="flex items-center justify-center gap-2 p-2 bg-gray-300 rounded-lg hover:bg-gray-400"
              onClick={() => setIsCouponModalOpen(prev => !prev)}
            >
              <FaTag /> Coupon
            </button>
            <button
              aria-label="Apply discount"
              className="flex items-center justify-center gap-2 p-2 bg-gray-300 rounded-lg hover:bg-gray-400"
              onClick={() => setIsDiscountModalOpen(prev => !prev)}
            >
              <FaPercentage /> Discount
            </button>
            <button
              aria-label="Hold order"
              className="flex items-center justify-center gap-2 p-2 bg-gray-300 rounded-lg hover:bg-gray-400"
            >
              <FaPause /> Hold Order
            </button>
          </div>

          {/* Proceed to Payment */}
          <button 
            aria-label="Proceed to payment"
            onClick={() => setIsPaymentPageVisible(true)} 
            className="w-full py-3 bg-blue-600 text-white rounded-lg mt-4 text-lg font-semibold hover:bg-blue-700"
          >
            Proceed to Pay <span>${total.toFixed(2)} &raquo;</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;