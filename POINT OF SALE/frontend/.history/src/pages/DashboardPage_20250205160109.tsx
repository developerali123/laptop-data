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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [barcodeInput, setBarcodeInput] = useState("");
  const [isCouponModalOpen, setIsCouponModalOpen] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [expandedItemId, setExpandedItemId] = useState(null);
  const [isDiscountModalOpen, setIsDiscountModalOpen] = useState(false);
  const [discount, setDiscount] = useState(0.0);
  const [appliedCoupons, setAppliedCoupons] = useState("N/A");

  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Cheese Burger",
      price: 120,
      quantity: 1,
      discount: 0,
      image: "/images/shirt.jpg",
    },
  ]);

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = ["All", "Chinese", "Beverages", "Bakery"];

  const products = [
    { id: 1, name: "Cheese Burger", price: 120, category: "Bakery", stock: 485, image: "/images/shirt.jpg" },
    { id: 2, name: "Chicken Burger", price: 220, category: "Bakery", stock: 483, image: "/images/shirt.jpg" },
    { id: 3, name: "Chicken Pizza", price: 250, category: "Chinese", stock: 476, image: "/images/shirt.jpg" },
    { id: 4, name: "Chilli Potato", price: 50, category: "Chinese", stock: 473, image: "/images/shirt.jpg" },
    { id: 5, name: "Chilli Potato", price: 50, category: "Chinese", stock: 473, image: "/images/shirt.jpg" },

    { id: 4, name: "Chilli Potato", price: 50, category: "Chinese", stock: 473, image: "/images/shirt.jpg" },

    { id: 4, name: "Chilli Potato", price: 50, category: "Chinese", stock: 473, image: "/images/shirt.jpg" },

    { id: 4, name: "Chilli Potato", price: 50, category: "Chinese", stock: 473, image: "/images/shirt.jpg" },

  ];

  // Add Product to Cart
  const addToCart = (product) => {
    const existingItem = cartItems.find((item) => item.id === product.id);
    if (existingItem) {
      setCartItems(cartItems.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1, discount: 0 }]);
    }
  };

  // Calculate Total
  const calculateTotal = () => {
    const subtotal = cartItems.reduce(
      (acc, item) =>
        acc + (item.price - (item.price * (item.discount || 0)) / 100) * item.quantity,
      0
    );
    const tax = subtotal * 0.1; // 10% Tax
    return { subtotal, tax, total: subtotal + tax };
  };

  const { subtotal, tax, total } = calculateTotal();

  const updateCartItem = (id, updatedFields) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, ...updatedFields } : item))
    );
  };

  const deleteCartItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  return (
    <div className="flex-grow flex flex-row p-6 bg-white dark:bg-gray-900 overflow-hidden">
      {/* Left Section: Products */}
      <div className="w-[60%]">
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
            placeholder="Search Product by title"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 border rounded-lg"
          />
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg" onClick={() => setSearchQuery("")}>
            Clear
          </button>
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

      {/* Right Section: Cart */}
      <div className="w-[40%] pl-4">
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
        </div>        <div className="overflow-y-auto max-h-[calc(100vh-250px)]">
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

        {/* Summary */}
        <aside className="bg-white shadow-lg rounded-lg p-4 w-full max-w-md ml-auto">
        

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
    </div>
  );
};

export default DashboardPage;
