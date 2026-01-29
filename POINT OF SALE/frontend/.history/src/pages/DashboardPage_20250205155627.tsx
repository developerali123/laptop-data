import { useState } from "react";
import {
  FaBarcode,
  FaCheck,
  FaChevronDown,
  FaChevronUp,
  FaMinus,
  FaPlus,
  FaSave,
  FaTrashAlt,
  FaShoppingCart,
  FaSyncAlt,
  FaPause,
  FaTag,
  FaPercentage,
} from "react-icons/fa";

const DashboardPage = () => {
  const [isCouponModalOpen, setIsCouponModalOpen] = useState(false);
  const [isDiscountModalOpen, setIsDiscountModalOpen] = useState(false);
  const [discount, setDiscount] = useState(0.0);
  const [appliedCoupons, setAppliedCoupons] = useState("N/A");

  const subtotal = 0.0;
  const tax = 0.0;
  const total = subtotal - discount + tax;

  return (
    <div className="grid grid-cols-3 gap-4 p-6 bg-white dark:bg-gray-900 min-h-screen">
      {/* Sidebar Placeholder (Hidden or Collapsed) */}
      <aside className="hidden md:block"></aside>

      {/* Product Section */}
      <main className="bg-gray-100 p-6 rounded-lg shadow-md"> 
        <h2 className="text-xl font-semibold text-black dark:text-gray-100 mb-4">
          Products
        </h2>
        {/* Product content goes here */}
      </main>

      {/* Cart Section */}
      <aside className="bg-white shadow-lg rounded-lg p-4 w-full max-w-md ml-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <FaShoppingCart /> Cart Items
          </h2>
          <div className="flex gap-2">
            <button className="p-2 bg-gray-200 rounded-full">
              <FaPause />
            </button>
            <button className="p-2 bg-gray-200 rounded-full">
              <FaSyncAlt />
            </button>
          </div>
        </div>

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
          <button
            className="flex items-center justify-center gap-2 p-2 bg-gray-300 rounded-lg"
            onClick={() => setIsCouponModalOpen(!isCouponModalOpen)}
          >
            <FaTag /> Coupon
          </button>
          <button
            className="flex items-center justify-center gap-2 p-2 bg-gray-300 rounded-lg"
            onClick={() => setIsDiscountModalOpen(!isDiscountModalOpen)}
          >
            <FaPercentage /> Discount
          </button>
          <button className="flex items-center justify-center gap-2 p-2 bg-gray-300 rounded-lg">
            <FaPause /> Hold Order
          </button>
        </div>

        <button className="mt-4 w-full p-3 text-white bg-blue-600 rounded-lg text-lg font-semibold flex justify-between">
          <span>Proceed to Pay</span>
          <span>${total.toFixed(2)} &raquo;</span>
        </button>
      </aside>
    </div>
  );
};

export default DashboardPage;
