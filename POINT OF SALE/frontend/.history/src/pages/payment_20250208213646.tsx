import React, { useState } from 'react';
import 
import {
  FaBarcode,
  FaCheck,
  FaChevronDown,
  FaChevronUp,
  FaMinus,
  FaPlus,
  FaSave,
  FaTrashAlt,
} from "react-icons/fa";

const DashboardPage = () => {
  const [isPaymentPageVisible, setIsPaymentPageVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [expandedItemId, setExpandedItemId] = useState(null);
  const [couponCode, setCouponCode] = useState("");

  const categories = ["All", "Chinese", "Beverages", "Bakery"];

  const products = [
    { id: 1, name: "Cheese Burger", price: 120, category: "Bakery", stock: 485, image: "/images/shirt.jpg" },
    { id: 2, name: "Chicken Burger", price: 220, category: "Bakery", stock: 483, image: "/images/shirt.jpg" },
    { id: 3, name: "Chicken Pizza", price: 250, category: "Chinese", stock: 476, image: "/images/shirt.jpg" },
    { id: 4, name: "Chilli Potato", price: 50, category: "Chinese", stock: 473, image: "/images/shirt.jpg" },
  ];

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      return existingItem
        ? prevItems.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)
        : [...prevItems, { ...product, quantity: 1, discount: 0 }];
    });
  };

  const deleteCartItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const toggleExpandedItem = (id) => {
    setExpandedItemId((prevId) => (prevId === id ? null : id));
  };

  const calculateTotal = () => {
    const subtotal = cartItems.reduce(
      (acc, item) => acc + (item.price - (item.price * (item.discount || 0)) / 100) * item.quantity,
      0
    );
    const tax = subtotal * 0.1;
    return { subtotal, tax, total: subtotal + tax };
  };

  const { subtotal, tax, total } = calculateTotal();

  const filteredProducts = products.filter(
    (product) =>
      (selectedCategory === "All" || product.category === selectedCategory) &&
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return isPaymentPageVisible ? (
    <Payment total={total} />
  ) : (
    <div className="flex-grow flex flex-row p-6 bg-white dark:bg-gray-900 overflow-hidden">
      {/* Left Section: Products */}
      <div className="w-[60%]">
        <h2 className="text-2xl font-semibold mb-4">Select Category</h2>
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map((category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-lg ${
                selectedCategory === category ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 mb-6">
          <input
            type="text"
            placeholder="Search Product"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 border rounded-lg"
          />
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg" onClick={() => setSearchQuery("")}>Clear</button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              onClick={() => addToCart(product)}
              className="bg-white border rounded-lg shadow hover:border-blue-500 cursor-pointer transition"
            >
              <img className="rounded-t-lg w-full" src={product.image} alt={product.name} />
              <div className="p-4">
                <h5 className="text-lg font-bold">{product.name}</h5>
                <p className="text-blue-600">${product.price.toFixed(2)}</p>
                <p className="text-green-500">Stock: {product.stock}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Section: Cart */}
      <Cart cartItems={cartItems} setCartItems={setCartItems} subtotal={subtotal} tax={tax} total={total} couponCode={couponCode} setIsPaymentPageVisible={setIsPaymentPageVisible} deleteCartItem={deleteCartItem} toggleExpandedItem={toggleExpandedItem} expandedItemId={expandedItemId} />
    </div>
  );
};

export default DashboardPage;
