import React from 'react';
import { FaShoppingCart, FaTrashAlt, FaTag, FaPercentage, FaPause } from "react-icons/fa";

const Cart = ({ cartItems, deleteCartItem, subtotal, tax, total, discount, appliedCoupons }) => {
  return (
    <div className="w-[40%] pl-4 max-h-[calc(100vh-100px)] overflow-y-auto">
      <h2 className="text-xl font-semibold flex items-center gap-2"><FaShoppingCart /> Cart Items</h2>
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
              <FaTrashAlt className="text-red-500 text-xl cursor-pointer" onClick={() => deleteCartItem(item.id)} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cart;
