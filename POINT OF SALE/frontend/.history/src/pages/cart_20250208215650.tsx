import React from 'react';
import { FaShoppingCart,FaPercentage,FaTag,FaPause, FaTrashAlt } from "react-icons/fa";

const Cart = ({ cartItems ,deleteCartItem, subtotal, tax, total, discount, appliedCoupons }) => {
    
  return (
    <div className="w-[40%] pl-4 max-h-[calc(100vh-100px)] overflow-y-auto">
      <h2 className="text-xl font-semibold flex items-center gap-2">
        <FaShoppingCart /> Cart Items
      </h2>

      <div className="overflow-y-auto max-h-[calc(100vh-250px)]">
        {cartItems.map((item) => (
          <div key={item.id} className="border rounded-lg p-4 shadow bg-white">
            <div className="flex justify-between items-center">
              <img src={item.image} alt={item.name} className="w-16 h-16 rounded-md" />
              <div>
                <h5 className="text-lg font-bold">{item.name}</h5>
                <p>${item.price} x {item.quantity}</p>
              </div>
              <p>${(item.price * item.quantity).toFixed(2)}</p>
              <FaTrashAlt
                className="text-red-500 text-xl cursor-pointer"
                onClick={() => deleteCartItem(item.id)}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Corrected aside closing tags */}
      <aside className="fixed bottom-0 left-0 right-0 bg-white shadow-lg rounded-t-lg p-4 w-full max-w-md ml-auto">
        <div className="border-t pt-4">
          <p className="flex justify-between text-gray-600">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </p>
          <p className="flex justify-between text-gray-600">
            <span>Tax</span>
            <span>${tax.toFixed(2)}</span>
          </p>
          <p className="flex justify-between text-gray-600">
            <span>Discount</span>
            <span>${discount.toFixed(2)}</span>
          </p>
          <p className="flex justify-between text-gray-600">
            <span>Applied Coupon(s)</span>
            <span>{appliedCoupons}</span>
          </p>
        </div>
      
      <div className="grid grid-cols-3 gap-2 mt-4">
<button className="flex items-center justify-center gap-2 p-2 bg-gray-300 rounded-lg" onClick={() => setIsCouponModalOpen(!isCouponModalOpen)}>
  <FaTag /> Coupon
</button>
<button className="flex items-center justify-center gap-2 p-2 bg-gray-300 rounded-lg" onClick={() => setIsDiscountModalOpen(!isDiscountModalOpen)}>
  <FaPercentage /> Discount
</button>
<button className="flex items-center justify-center gap-2 p-2 bg-gray-300 rounded-lg">
  <FaPause /> Hold Order
</button>
</div>

<button className="mt-4 w-full p-3 text-white bg-blue-600 rounded-lg text-lg font-semibold flex justify-between">
<span>Proceed to Pay</span>
<span>${total.toFixed(2)} &raquo;</span>
</button></aside>
    </div>
  );
};

export default Cart;
