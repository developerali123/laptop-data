import { useState } from "react";
import Cart from "./Cart";
import Payment from "./payment";

const DashboardPage = () => {
  const [isPaymentPageVisible, setIsPaymentPageVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [couponCode, setCouponCode] = useState("");

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
  ];

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      return existingItem
        ? prevItems.map((item) =>
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
          )
        : [...prevItems, { ...product, quantity: 1, discount: 0 }];
    });
  };

  const updateCartItem = (id, updatedFields) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, ...updatedFields } : item))
    );
  };

  const deleteCartItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const filteredProducts = products.filter(
    (product) =>
      (selectedCategory === "All" || product.category === selectedCategory) &&
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleProceedToPay = () => {
    if (cartItems.length > 0) {
      setIsPaymentPageVisible(true);
    }
  };

  return (
    <div className="flex-grow flex flex-row p-6 bg-white dark:bg-gray-900 overflow-hidden">
      {/* Left Section: Products */}
      <div className="w-[60%] max-h-[calc(100vh-100px)] p-6 overflow-y-auto">
        {isPaymentPageVisible ? (
          <Payment total={cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)} />
        ) : (
          <>
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
              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg" onClick={() => setSearchQuery("")}>
                Clear
              </button>
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
          </>
        )}
      </div>

      {/* Right Section: Cart */}
      <Cart
        cartItems={cartItems}
        updateCartItem={updateCartItem}
        deleteCartItem={deleteCartItem}
        onProceedToPay={handleProceedToPay}
      />
    </div>
  );
};

export default DashboardPage;