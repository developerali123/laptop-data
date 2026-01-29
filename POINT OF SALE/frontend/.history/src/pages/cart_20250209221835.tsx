import { FaTag, FaPercentage, FaPause } from "react-icons/fa";
import { useState } from "react";

const Cart = ({ cartItems, updateCartItem, deleteCartItem, onProceedToPay }) => {
  const [isCouponModalOpen, setIsCouponModalOpen] = useState(false);
  const [isDiscountModalOpen, setIsDiscountModalOpen] = useState(false);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.10; // Assuming a 10% tax rate
  const total = subtotal + tax;

  return (
    <div className="w-[40%] p-6 bg-white relative">
      <h2 className="text-2xl font-semibold mb-4">Cart Items</h2>

      {/* Cart Items */}
      {cartItems.length === 0 ? (
        <p className="text-gray-500 mb-4">Your cart is empty.</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div key={item.id} className="flex justify-between items-center mb-4">
              <div>
                <p className="font-bold">{item.name}</p>
                <p>${item.price.toFixed(2)} x {item.quantity}</p>
              </div>
              <div>
                <button
                  className="px-2 py-1 bg-blue-500 text-white rounded-lg mr-2"
                  onClick={() => updateCartItem(item.id, { quantity: item.quantity + 1 })}
                >
                  +
                </button>
                <button
                  className="px-2 py-1 bg-blue-500 text-white rounded-lg mr-2"
                  onClick={() => updateCartItem(item.id, { quantity: item.quantity - 1 })}
                >
                  -
                </button>
                <button
                  className="px-2 py-1 bg-red-500 text-white rounded-lg"
                  onClick={() => deleteCartItem(item.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </>
      )}

      {/* Fixed Bottom Section */}
      <div className="fixed bottom-0 w-40 bg-white shadow p-4">
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
        </div>

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

        {/* Proceed to Pay Button */}
        <button
          className={`w-full ${
            cartItems.length === 0 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500"
          } text-white p-2 rounded-lg mt-4`}
          onClick={onProceedToPay}
          disabled={cartItems.length === 0}
        >
          Proceed to Pay  <span>${total.toFixed(2)} &raquo;</span>
        </button>
      </div>
    </div>
  );
};

export default Cart;