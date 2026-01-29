import { useState } from "react";''
import {
  FaShoppingCart,
  FaTrashAlt,
  FaTag,
  FaPercentage,
  FaPause,
} from "react-icons/fa";

const DashboardPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isCouponModalOpen, setIsCouponModalOpen] = useState(false);
  const [isDiscountModalOpen, setIsDiscountModalOpen] = useState(false);
  const [discount, setDiscount] = useState(0.0);
  const [appliedCoupons, setAppliedCoupons] = useState("N/A");

  const categories = ["All", "Chinese", "Beverages", "Bakery"];

  const products = [
    { id: 1, name: "Cheese Burger", price: 120, category: "Bakery", stock: 485, image: "/images/shirt.jpg" },
    { id: 2, name: "Chicken Burger", price: 220, category: "Bakery", stock: 483, image: "/images/shirt.jpg" },
    { id: 3, name: "Chicken Pizza", price: 250, category: "Chinese", stock: 476, image: "/images/shirt.jpg" },
    { id: 4, name: "Chilli Potato", price: 50, category: "Chinese", stock: 473, image: "/images/shirt.jpg" },
    { id: 5, name: "Chilli sauce", price: 50, category: "Chinese", stock: 473, image: "/images/shirt.jpg" },
    { id: 6, name: "Mashed Potato", price: 450, category: "Chinese", stock: 473, image: "/images/shirt.jpg" },
    { id: 7, name: "Apple Pie", price: 450, category: "Bakery", stock: 473, image: "/images/shirt.jpg" },
    { id: 8, name: "Strawberry Donuts", price: 450, category: "Bakery", stock: 473, image: "/images/shirt.jpg" },
    { id: 9, name: "Chocolate Donuts", price: 450, category: "Bakery", stock: 473, image: "/images/shirt.jpg" },
    { id: 10, name: "Italian Pizza", price: 1500, category: "Chinese", stock: 473, image: "/images/shirt.jpg" },
    { id: 11, name: "Mexican Pizza", price: 2500, category: "Chinese", stock: 473, image: "/images/shirt.jpg" },
  ]

  const addToCart = (product) => {
    setCartItems((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const deleteCartItem = (id) => {
    setCartItems((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const tax = subtotal * 0.1; // Assuming 10% tax
  const total = subtotal + tax - discount;

  return (
    <div className="flex-grow flex flex-row p-6 bg-white dark:bg-gray-900 overflow-hidden">
      <div className="w-[60%] max-h-[calc(100vh-100px)] overflow-y-auto">
        <h2 className="text-2xl font-semibold text-black dark:text-gray-100 mb-4">Select Category</h2>
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map((category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-lg ${selectedCategory === category ? "bg-blue-500 text-white" : "bg-gray-200 text-black"}`}
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
          {products
            .filter((product) => selectedCategory === "All" || product.category === selectedCategory)
            .filter((product) => product.name.toLowerCase().includes(searchQuery.toLowerCase()))
            .map((product) => (
              <div key={product.id} onClick={() => addToCart(product)} className="max-w-sm bg-white border rounded-lg shadow hover:border-blue-500 cursor-pointer">
                <img className="rounded-t-lg w-full" src={product.image} alt={product.name} />
                <div className="p-4">
                  <h5 className="text-lg font-bold text-gray-900">{product.name}</h5>
                  <p className="text-blue-600">${product.price.toFixed(2)}</p>
                  <p className="text-green-500">In Stock ({product.stock})</p>
                </div>
              </div>
            ))}
        </div>
      </div>

      <Cart />
    </div>
  );
};

export default DashboardPage;
